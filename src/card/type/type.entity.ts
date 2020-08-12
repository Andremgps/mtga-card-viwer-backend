import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("type")
export class TypeEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}