import { Column, PrimaryGeneratedColumn } from "typeorm";




export class EntityGeneric{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    dataCreacion:Date;

    @Column()
    dataAlteracion:Date;

    @Column()
    descripcion:string;
}