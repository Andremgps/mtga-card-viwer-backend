import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
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

  @Column('simple-array')
  color_identity: string[];

  @Column('simple-array')
  card_sets: string[];

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
  @Exclude()
  sets: SetEntity[];

  //Coluna criada para fazer o join e filtrar por cores
  @ManyToMany(type => ColorEntity)
  @JoinTable()
  @Exclude()
  colors: ColorEntity[];
}
