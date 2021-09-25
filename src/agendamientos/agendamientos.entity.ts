import { TipoAgendamiento } from "src/enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "src/enums/tipo-periodo-agendamiento.enum";
import { Servicios } from "src/servicios/servicios.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";




@Entity()
export class Agendamientos extends EntityGeneric{

@Column()
tipo:TipoAgendamiento;

@Column({nullable:true})
fecha_objetivo: Date;

@Column({nullable:true})
tipo_periodo:TipoPeriodoAgendamiento;

@Column({nullable:true})
periodo:number;


@OneToOne(type => Servicios,servicio => servicio.agendamiento)
@JoinColumn()
servicio:Servicios;

}