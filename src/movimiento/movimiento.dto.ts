import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber } from "class-validator";
import { EstadoMovimientos } from "src/enums/estado-movimientos.enum";
import { DtoGeneric } from "src/shared/generic/DtoGeneric";

export class MovimientoDto extends DtoGeneric{

    @Type(()=>Date)
    @ApiProperty()
    fechaInicio:Date;

    @Type(()=>Date)
    @ApiProperty()
    fechaFin:Date;

    @IsNumber()
    @ApiProperty()
    kmInicio:number;

    @IsNumber()
    @ApiProperty()
    kmFin:number;


    @IsNumber()
    @ApiProperty()
    valorServicio:number;

    @IsEnum(EstadoMovimientos)
    @ApiProperty()
    estado:EstadoMovimientos;
    
}