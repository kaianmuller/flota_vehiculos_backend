import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { DisponibilidadAuto } from "src/enums/disponibilidad-auto.enum";
import { Servicios } from "src/servicios/servicios.entity";
import { DtoGeneric } from "src/shared/generic/dto-generic.dto";







export class AutosDto extends DtoGeneric{

    @ApiProperty()
    @IsString()
    chapa:string;

    @ApiProperty()
    @IsString()
    chassis:string;

    @ApiProperty()
    @IsString()
    fabricante:string;

    @ApiProperty()
    @IsString()
    modelo:string;

    @ApiProperty()
    @IsNumber()
    kilometraje:number;

    @ApiProperty()
    @IsNumber()
    ano_modelo:number;

    @ApiProperty()
    @IsNumber()
    ano_fabricacion:number;

    @ApiProperty()
    @IsEnum(DisponibilidadAuto)
    disponibilidad:DisponibilidadAuto;


}