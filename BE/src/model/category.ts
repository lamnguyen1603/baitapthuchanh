import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id : number;
    @Column({type :"varchar",length: 255})
    name : string;
}