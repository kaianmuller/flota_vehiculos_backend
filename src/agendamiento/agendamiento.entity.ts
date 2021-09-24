import { TipoAgendamiento } from "src/enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "src/enums/tipo-periodo-agendamiento.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";




@Entity()
export class Agendamiento extends EntityGeneric{

@Column()
tipo:TipoAgendamiento;

@Column({nullable:true})
fechaObjetivo: Date;

@Column({nullable:true})
tipoPeriodo:TipoPeriodoAgendamiento;

@Column({nullable:true})
periodo:number;

@OneToOne(type => Servicio,servicio => servicio.agendamiento)
@JoinColumn()
servicio:Servicio;

}