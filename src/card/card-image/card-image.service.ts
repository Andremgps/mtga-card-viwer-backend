import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardImageEntity } from './card-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardImageService {
  constructor(
    @InjectRepository(CardImageEntity)
    private readonly cardImageRepository: Repository<CardImageEntity>,
  ) {}

  async createCardImage(
    cardImageEntity: CardImageEntity,
  ): Promise<CardImageEntity> {
    const result = await this.cardImageRepository.save(cardImageEntity);
    return result;
  }
}
