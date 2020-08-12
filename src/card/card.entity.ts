import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { SetEntity } from './set/set.entity';
import { CardImageEntity } from './card-image/card-image.entity';
import { ColorEntity } from './color/color.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cmc: number;

  @Column()
  rarity: string;

  @Column()
  type_line: string;

  @OneToMany(
    type => CardImageEntity,
    card_image => card_image.card,
  )
  images: CardImageEntity[];

  @ManyToMany(type => SetEntity)
  @JoinTable()
  sets: SetEntity[];

  @ManyToMany(type => ColorEntity)
  @JoinTable()
  colors: ColorEntity[];
}
