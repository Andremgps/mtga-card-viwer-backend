import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('super_type')
export class SuperTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
