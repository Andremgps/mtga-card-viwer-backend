import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sub_type')
export class SubTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
