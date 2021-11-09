import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



export class EntityGeneric{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha_creacion:Date;

    @Column({nullable:true})
    fecha_alteracion:Date;

    @Column({nullable:true})
    descripcion:string;
}