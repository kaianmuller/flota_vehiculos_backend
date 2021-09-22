
import { DisponibilidadAuto } from "src/enums/disponibilidad-auto.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Auto extends EntityGeneric{


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
     disponibilidad:DisponibilidadAuto;

    @OneToMany(() => Servicio, servicio => servicio.auto,{ cascade: true })
     servicios: Array<Servicio>;


}