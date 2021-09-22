import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { DisponibilidadAuto } from "src/enums/disponibilidad-auto.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { DtoGeneric } from "src/shared/generic/DtoGeneric";
import { Column } from "typeorm";







export class AutoDto extends DtoGeneric{


    @IsString()
    @ApiProperty({type:String,description:'chapa'})
    chapa:string;

    @IsString()
    @ApiProperty()
    chassis:string;

    @IsString()
    @ApiProperty()
    fabricante:string;

    @IsString()
    @ApiProperty()
    modelo:string;

    @IsNumber()
    @ApiProperty()
    kilometraje:number;

    @IsNumber()
    @ApiProperty()
    anoModelo:number;

    @IsNumber()
    @ApiProperty()
    anoFabricacion:number;

    @IsEnum(DisponibilidadAuto)
    @ApiProperty()
    disponibilidad:DisponibilidadAuto;

    @IsArray()
    servicios:Array<Servicio>


}