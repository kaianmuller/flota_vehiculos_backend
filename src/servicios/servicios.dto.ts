
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber } from "class-validator";
import { EstadoServicio } from "src/enums/estado-servicio.enum";
import { DtoGeneric } from "src/shared/generic/dto-generic.dto";





export class ServiciosDto extends DtoGeneric{


    @ApiProperty()
    @Type(()=>Date)
    fecha_inicio:Date;

    @ApiProperty()
    @Type(()=>Date)
    fecha_fin:Date;

    @ApiProperty()
    @IsNumber()
    km_inicial:number;

    @ApiProperty()
    @IsNumber()
    km_final:number;


    @ApiProperty()
    @IsNumber()
    valor_servicio:number;

    @ApiProperty()
    @IsEnum(EstadoServicio)
    estado:EstadoServicio;

}