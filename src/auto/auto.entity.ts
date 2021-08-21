
import { Servicio } from "src/servicio/servicio.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Auto{


    @PrimaryGeneratedColumn()
     id:number;

     @Column()
     dataCreacion:Date;

     @Column()
     dataAlteracion:Date;

     @Column()
     chapa:string;

     @Column()
     chassis:string;

     @Column()
     fabricante:string;

     @Column()
     modelo:string;

     @Column()
     kilometraje:number;

     @Column()
     anoModelo:number;

     @Column()
     anoFabricacion:number;

     @Column()
     descripcion:string;

    @OneToMany(() => Servicio, servicio => servicio.auto,{ cascade: true })
     servicios: Array<Servicio>;


}