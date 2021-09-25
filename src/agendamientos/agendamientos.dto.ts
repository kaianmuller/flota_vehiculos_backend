import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber } from "class-validator";
import { TipoAgendamiento } from "src/enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "src/enums/tipo-periodo-agendamiento.enum";
import { ServiciosDto } from "src/servicios/servicios.dto";
import { Servicios } from "src/servicios/servicios.entity";
import { DtoGeneric } from "src/shared/generic/DtoGeneric.dto";




export class AgendamientosDto extends DtoGeneric{


@ApiProperty()
@IsEnum(TipoAgendamiento)
tipo:TipoAgendamiento;

@ApiProperty()
@Type(()=>Date)
fecha_objetivo: Date;

@ApiProperty()
@IsEnum(TipoPeriodoAgendamiento)
tipo_periodo:TipoPeriodoAgendamiento;

@ApiProperty()
@IsNumber()
periodo:number;

@ApiProperty({type:ServiciosDto})
servicio:Servicios;

}