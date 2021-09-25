
import { ApiProperty } from "@nestjs/swagger";
import { DisponibilidadAuto } from "src/enums/disponibilidad-auto.enum";
import { Servicios } from "src/servicios/servicios.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Autos extends EntityGeneric{

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
     ano_modelo:number;

     @Column()
     ano_fabricacion:number;

     @Column()
     disponibilidad:DisponibilidadAuto;

    @OneToMany(type => Servicios, servicio => servicio.auto,{ cascade: true })
     servicios: Array<Servicios>;


}