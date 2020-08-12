import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ColorModule } from './color/color.module';
import { CardImageModule } from './card-image/card-image.module';
import { SetModule } from './set/set.module';
import { TypeModule } from './type/type.module';
import { SubTypeModule } from './subtype/sub-type.module';
import { SuperTypeModule } from './supertype/super-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity]),
    ColorModule,
    CardImageModule,
    SetModule,
    TypeModule,
    SubTypeModule,
    SuperTypeModule,
  ],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
