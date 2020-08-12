import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('set')
export class SetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  set: string;

  @Column()
  set_name: string;

  @Column()
  set_icon: string;
}
