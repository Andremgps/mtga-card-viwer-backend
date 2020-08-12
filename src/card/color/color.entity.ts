import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('color')
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;
}
