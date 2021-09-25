
import { Servicios } from "src/servicios/servicios.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TiposServicio{


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion:string;


    @OneToMany(() => Servicios, servicio => servicio.tipo_servicio,{ cascade: true })
    servicios: Array<Servicios>;
}