import { Autos } from "src/autos/autos.entity";
import { TipoAgendamiento } from "src/enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "src/enums/tipo-periodo-agendamiento.enum";
import { Servicios } from "src/servicios/servicios.entity";
import { EntityGeneric } from "src/shared/generic/entity-generic.entity";
import { TiposServicio } from "src/tipos-servicio/tipos-servicio.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";




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



@ManyToOne(type => TiposServicio,tipo_servicio => tipo_servicio.agendamientos)
tipo_servicio:TiposServicio;

@ManyToOne(type => Autos, auto=>auto.agendamientos)
auto:Autos;

@ManyToOne(type => Usuarios, usuario=>usuario.agendamientos)
usuario:Usuarios;

}