import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from '../card.entity';

@Entity('card_images')
export class CardImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_uri: string;

  @Column()
  face_name: string;

  @ManyToOne(
    type => CardEntity,
    card => card.images,
  )
  card: CardEntity;
}
