import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardImageEntity } from './card-image.entity';
import { CardImageService } from './card-image.service';
import { CardImageController } from './card-image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardImageEntity])],
  providers: [CardImageService],
  controllers: [CardImageController],
  exports: [CardImageService],
})
export class CardImageModule {}
