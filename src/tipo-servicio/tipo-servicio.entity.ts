import { Servicio } from "src/servicio/servicio.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TipoServicio{


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion:string;


    @OneToMany(() => Servicio, servicio => servicio.tipoServicio,{ cascade: true })
    servicios: Array<Servicio>;
}