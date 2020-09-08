import { Injectable, HttpService, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { AllSetsResponseModel } from './models/all-sets-response.model';
import { CardResponseModel } from './models/card-response.model';
import { CardListResponseModel } from './models/card-list-response.model';

import { SetEntity } from 'src/card/set/set.entity';
import { CardEntity } from 'src/card/card.entity';
import { CardImageEntity } from 'src/card/card-image/card-image.entity';
import { TypeEntity } from 'src/card/type/type.entity';
import { SubTypeEntity } from 'src/card/subtype/sub-type.entity';
import { SuperTypeEntity } from 'src/card/supertype/super-type.entity';

import { SetService } from 'src/card/set/set.service';
import { CardService } from 'src/card/card.service';
import { CardImageService } from 'src/card/card-image/card-image.service';
import { ColorService } from 'src/card/color/color.service';
import { TypeService } from 'src/card/type/type.service';
import { SubTypeService } from 'src/card/subtype/sub-type.service';
import { SuperTypeService } from 'src/card/supertype/super-type.service';

import * as imageDownloader from 'image-downloader';

import 'dotenv/config';

@Injectable()
export class TasksService {
  constructor(
    private http: HttpService,
    private setService: SetService,
    private cardService: CardService,
    private cardImageService: CardImageService,
    private colorService: ColorService,
    private typeService: TypeService,
    private subTypeService: SubTypeService,
    private superTypeService: SuperTypeService,
  ) {}

  //@Cron('0 23 * * * *')
  @Cron('0 0 3 */2 * *')
  async handleCron(): Promise<any> {
    try {
      const sets = await this.loadSets();
      const cards = await this.loadCards(sets);
      await this.loadAllMtgaTypes(cards);
      Logger.log('Integration Done!');
    } catch (error) {
      Logger.error(error);
      setTimeout(() => {
        this.handleCron();
      }, 180 * 60 * 1000);
    }
  }

  private async loadSets(): Promise<SetEntity[]> {
    const response = await this.http
      .get<AllSetsResponseModel>('https://api.scryfall.com/sets')
      .toPromise();
    //Por algum motivo os seguintes sets não tem um arena_code na api da scryfall mas algumas cartas
    //Exitem no arena mesmo assim
    const setsInArenaWithoutArenaCodeInApi = ['ana', 'ajmp', 'jmp'];
    const filteredSets = response.data.data.filter(
      x => x.arena_code || setsInArenaWithoutArenaCodeInApi.includes(x.code),
    );
    //Typeorm não tem upsert ;-;
    const sets = await Promise.all(
      filteredSets.map(async rawSet => {
        const foundSet = await this.setService.findOne(rawSet.code);
        if (foundSet) {
          foundSet.set_name = rawSet.name;
          return foundSet;
        } else {
          const set = new SetEntity();
          set.set = rawSet.code;
          set.set_name = rawSet.name;
          set.set_icon = await this.saveImage(
            rawSet.icon_svg_uri,
            './images/sets',
          );
          return set;
        }
      }),
    );
    return await this.setService.create(sets);
  }

  private async loadCards(sets: SetEntity[]): Promise<CardEntity[]> {
    const rawCards: CardResponseModel[] = [];
    for (const set of sets) {
      let pageUrl = `https://api.scryfall.com/cards/search?q=in=mtga+set=${set.set}`;
      let hasMore = false;
      do {
        const response = await this.http
          .get<CardListResponseModel>(pageUrl, {
            validateStatus: function() {
              return true;
            },
          })
          .toPromise();
        Logger.log(pageUrl);
        if (response.data.object != 'error') {
          response.data.data.forEach(card => {
            card.all_sets = [set];
            const cardIndex = rawCards.findIndex(x => x.name === card.name);
            if (cardIndex == -1) {
              rawCards.push(card);
            } else {
              rawCards[cardIndex].all_sets.push(set);
            }
          });
          pageUrl = response.data.next_page;
          hasMore = response.data.has_more;
        }
      } while (hasMore);
    }
    const colors = await this.colorService.findAll();
    const cards: CardEntity[] = [];
    for (const rawCard of rawCards) {
      let foundCard = false;
      if (rawCard.layout === 'transform' || rawCard.layout === 'modal_dfc') {
        for (const cardFace of rawCard.card_faces) {
          const findedCard = await this.cardService.findByScryfallidAndName(
            rawCard.id,
            cardFace.name,
          );
          if (findedCard) {
            foundCard = true;
            const cardColors =
              rawCard.color_identity.length === 0
                ? colors.filter(x => x.color === 'N')
                : colors.filter(x => rawCard.color_identity.includes(x.color));
            findedCard.colors = cardColors;
            findedCard.color_identity = cardColors.map(x => x.color);
            findedCard.sets = rawCard.all_sets;
            findedCard.rarity = rawCard.rarity;
            findedCard.cmc = cardFace.mana_cost ? rawCard.cmc : 0;
            findedCard.type_line = cardFace.type_line;
            const cardResult = await this.cardService.create(findedCard);
            cards.push(cardResult);
          }
        }
      } else {
        const findedCard = await this.cardService.findByScryfallidAndName(
          rawCard.id,
          rawCard.name,
        );
        if (findedCard) {
          foundCard = true;
          const cardColors =
            rawCard.color_identity.length === 0
              ? colors.filter(x => x.color === 'N')
              : colors.filter(x => rawCard.color_identity.includes(x.color));
          findedCard.colors = cardColors;
          findedCard.color_identity = cardColors.map(x => x.color);
          findedCard.cmc = rawCard.cmc;
          findedCard.rarity = rawCard.rarity;
          findedCard.type_line = rawCard.type_line;
          findedCard.sets = rawCard.all_sets;
          const cardResult = await this.cardService.create(findedCard);
          cards.push(cardResult);
        }
      }
      if (!foundCard) {
        const card = new CardEntity();
        const cardColors =
          rawCard.color_identity.length === 0
            ? colors.filter(x => x.color === 'N')
            : colors.filter(x => rawCard.color_identity.includes(x.color));
        card.colors = cardColors;
        card.color_identity = cardColors.map(x => x.color);
        card.rarity = rawCard.rarity;
        card.sets = rawCard.all_sets;
        card.scryfallid = rawCard.id;
        if (rawCard.layout === 'transform' || rawCard.layout === 'modal_dfc') {
          //Front
          const cardFront = { ...card };
          cardFront.name = rawCard.card_faces[0].name;
          cardFront.cmc = rawCard.card_faces[0].mana_cost ? rawCard.cmc : 0;
          cardFront.type_line = rawCard.card_faces[0].type_line;
          cardFront.mana_cost = rawCard.card_faces[0].mana_cost;
          const cardFrontImage = new CardImageEntity();
          cardFrontImage.face_name = rawCard.card_faces[0].name;
          cardFrontImage.image_uri = await this.saveImage(
            rawCard.card_faces[0].image_uris.normal,
            './images/cards/front',
          );
          await this.cardImageService.createCardImage(cardFrontImage);
          cardFront.images = [cardFrontImage];
          const cardFrontResult = await this.cardService.create(cardFront);
          cards.push(cardFrontResult);
          //Back
          const cardBack = { ...card };
          cardBack.name = rawCard.card_faces[1].name;
          cardBack.cmc = rawCard.card_faces[1].mana_cost ? rawCard.cmc : 0;
          cardBack.type_line = rawCard.card_faces[1].type_line;
          cardBack.mana_cost = rawCard.card_faces[1].mana_cost;
          const cardBackImage = new CardImageEntity();
          cardBackImage.face_name = rawCard.card_faces[1].name;
          cardBackImage.image_uri = await this.saveImage(
            rawCard.card_faces[1].image_uris.normal,
            './images/cards/back',
          );
          await this.cardImageService.createCardImage(cardBackImage);
          cardBack.images = [cardBackImage];
          const cardBackResult = await this.cardService.create(cardBack);
          cards.push(cardBackResult);
        } else {
          card.name = rawCard.name;
          card.cmc = rawCard.cmc;
          card.type_line = rawCard.type_line;
          card.mana_cost = rawCard.mana_cost;
          const cardImage = new CardImageEntity();
          cardImage.face_name = rawCard.name;
          cardImage.image_uri = await this.saveImage(
            rawCard.image_uris.normal,
            './images/cards/front',
          );
          await this.cardImageService.createCardImage(cardImage);
          card.images = [cardImage];
          const cardResult = await this.cardService.create(card);
          cards.push(cardResult);
        }
      }
    }
    return cards;
  }

  private async loadAllMtgaTypes(cards: CardEntity[]): Promise<any> {
    const [
      responseTypes,
      responseSubTypes,
      responseSuperTypes,
    ] = await Promise.all([
      this.http
        .get<{ types: string[] }>('https://api.magicthegathering.io/v1/types')
        .toPromise(),
      this.http
        .get<{ subtypes: string[] }>(
          'https://api.magicthegathering.io/v1/subtypes',
        )
        .toPromise(),
      this.http
        .get<{ supertypes: string[] }>(
          'https://api.magicthegathering.io/v1/supertypes',
        )
        .toPromise(),
    ]);
    const types = responseTypes.data.types;
    const subTypes = responseSubTypes.data.subtypes;
    const superTypes = responseSuperTypes.data.supertypes;
    const mtgaTypes = [];
    const mtgaSubTypes = [];
    const mtgaSuperTypes = [];
    cards.forEach(card => {
      card.type_line.split('//').forEach(line => {
        const allTypesArray = line.split(' ');
        const emDashIndex = allTypesArray.indexOf('—');
        if (emDashIndex != -1) {
          for (let i = 0; i < emDashIndex; i++) {
            const actualElement = allTypesArray[i];
            if (
              superTypes.includes(actualElement) &&
              !mtgaSuperTypes.includes(actualElement)
            ) {
              mtgaSuperTypes.push(actualElement);
            } else if (
              types.includes(actualElement) &&
              !mtgaTypes.includes(actualElement)
            ) {
              mtgaTypes.push(actualElement);
            }
          }
          for (let i = emDashIndex + 1; i <= allTypesArray.length; i++) {
            const actualElement = allTypesArray[i];
            if (
              subTypes.includes(actualElement) &&
              !mtgaSubTypes.includes(actualElement)
            ) {
              mtgaSubTypes.push(actualElement);
            }
          }
        } else {
          for (let i = 0; i < allTypesArray.length; i++) {
            const actualElement = allTypesArray[i];
            if (
              superTypes.includes(actualElement) &&
              !mtgaSuperTypes.includes(actualElement)
            ) {
              mtgaSuperTypes.push(actualElement);
            } else if (
              types.includes(actualElement) &&
              !mtgaTypes.includes(actualElement)
            ) {
              mtgaTypes.push(actualElement);
            }
          }
        }
      });
    });
    const typeEntitys = await Promise.all(
      mtgaTypes.map(async mtgaType => {
        const foundType = await this.typeService.findOne(mtgaType);
        if (foundType) {
          return foundType;
        }
        const type = new TypeEntity();
        type.name = mtgaType;
        return type;
      }),
    );
    const subTypeEntitys = await Promise.all(
      mtgaSubTypes.map(async mtgaSubType => {
        const foundSubType = await this.subTypeService.findOne(mtgaSubType);
        if (foundSubType) {
          return foundSubType;
        }
        const type = new SubTypeEntity();
        type.name = mtgaSubType;
        return type;
      }),
    );
    const superTypeEntitys = await Promise.all(
      mtgaSuperTypes.map(async mtgaSuperType => {
        const foundSuperType = await this.superTypeService.findOne(
          mtgaSuperType,
        );
        if (foundSuperType) {
          return foundSuperType;
        }
        const type = new SuperTypeEntity();
        type.name = mtgaSuperType;
        return type;
      }),
    );
    await this.typeService.create(typeEntitys);
    await this.subTypeService.create(subTypeEntitys);
    await this.superTypeService.create(superTypeEntitys);
  }

  private async saveImage(imageUrl: string, path: string): Promise<string> {
    const { filename } = await imageDownloader.image({
      url: imageUrl,
      dest: path,
    });
    return `http://${process.env.HOST_IP}:3000/${filename}`;
  }
}
