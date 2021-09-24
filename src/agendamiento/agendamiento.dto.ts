import { Type } from "class-transformer";
import { IsEnum, IsNumber } from "class-validator";
import { TipoAgendamiento } from "src/enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "src/enums/tipo-periodo-agendamiento.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { DtoGeneric } from "src/shared/generic/DtoGeneric";




export class AgendamientoDto extends DtoGeneric{



@IsEnum(TipoAgendamiento)
tipo:TipoAgendamiento;

@Type(()=>Date)
fechaObjetivo: Date;

@IsEnum(TipoPeriodoAgendamiento)
tipoPeriodo:TipoPeriodoAgendamiento;

@IsNumber()
periodo:number;

servicio:Servicio;

}