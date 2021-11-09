
import { Agendamientos } from "src/agendamientos/agendamientos.entity";
import { Servicios } from "src/servicios/servicios.entity";
import { EntityGeneric } from "src/shared/generic/entity-generic.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class TiposServicio extends EntityGeneric{


    @OneToOne(type => Servicios,servicio => servicio.tipo_servicio,{cascade:true})
    servicios:Array<Servicios>;

    @OneToOne(type => Agendamientos,agendamiento => agendamiento.tipo_servicio,{cascade:true})
    agendamientos:Array<Agendamientos>;

    
}