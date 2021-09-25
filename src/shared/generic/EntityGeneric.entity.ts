import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



export class EntityGeneric{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha_creacion:Date;

    @Column()
    fecha_alteracion:Date;

    @Column()
    descripcion:string;
}