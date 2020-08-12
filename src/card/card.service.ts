import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { Repository, createQueryBuilder } from 'typeorm';
import { FilterCardDto } from './dto/filter-card.dto';
import { PaginatedCardResultDto } from './dto/paginated-card-result.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(cardEntity: CardEntity): Promise<CardEntity> {
    const result = await this.cardRepository.save(cardEntity);
    return result;
  }

  async findById(id: number): Promise<CardEntity> {
    const result = await this.cardRepository.findOne({
      relations: ['images', 'sets', 'colors'],
      where: {
        id,
      },
    });
    return result;
  }

  async findOne(name: string): Promise<CardEntity> {
    const result = await this.cardRepository.findOne({
      where: {
        name,
      },
    });
    return result;
  }

  async findAll(filterCardDto: FilterCardDto): Promise<PaginatedCardResultDto> {
    const skippedCards = (filterCardDto.page - 1) * filterCardDto.limit;
    const queryBuilder = createQueryBuilder(CardEntity, 'card');
    //Joins
    queryBuilder.leftJoinAndSelect('card.colors', 'color');
    queryBuilder.leftJoinAndSelect('card.sets', 'set');
    queryBuilder.leftJoinAndSelect('card.images', 'image');
    //Wheres
    queryBuilder.where(`1 = 1`);
    if (filterCardDto.name) {
      queryBuilder.andWhere(`name like :name`, {
        name: `%${filterCardDto.name}%`,
      });
    }
    if (filterCardDto.cmc) {
      const cmcConditions = {
        lessThan: '<=',
        greaterThan: '>=',
        equal: '=',
      };
      queryBuilder.andWhere(
        `cmc ${cmcConditions[filterCardDto.cmcCondition] || '='} :cmc`,
        {
          cmc: filterCardDto.cmc,
        },
      );
    }
    if (filterCardDto.rarity) {
      queryBuilder.andWhere('rarity = :rarity', {
        rarity: filterCardDto.rarity,
      });
    }
    if (filterCardDto.type_line) {
      queryBuilder.andWhere('type_line like :type_line', {
        type_line: `%${filterCardDto.type_line}%`,
      });
    }
    if (filterCardDto.colors) {
      const colors = filterCardDto.colors.split(',');
      if (!filterCardDto.matchAllColors) {
        queryBuilder.andWhere('card_color.colorId in (:...colors)', {
          colors: colors,
        });
      } else {
        //Kreygasm
        queryBuilder.andWhere(
          'card.id in ' +
            queryBuilder
              .subQuery()
              .select('cardId')
              .from('card_colors_color', 'card_colors')
              .where('colorId in (:...colors)', { colors: colors })
              .groupBy('cardId')
              .having('COUNT(DISTINCT colorId) = :colorLength', {
                colorLength: colors.length,
              })
              .getQuery(),
        );
      }
    }
    if (filterCardDto.sets) {
      const sets = filterCardDto.sets.split(',');
      queryBuilder.andWhere('card_set.setId in (:...sets)', {
        sets: sets,
      });
    }
    const totalCount = await queryBuilder.getCount();
    const hasMore = skippedCards + filterCardDto.limit < totalCount;
    const cards = await queryBuilder
      .skip(skippedCards)
      .take(filterCardDto.limit)
      .getMany();
    return {
      data: cards,
      page: filterCardDto.page,
      limit: filterCardDto.limit,
      totalCount,
      hasMore,
    };
  }
}
