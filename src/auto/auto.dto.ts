import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { Column } from "typeorm";







export class AutoDto {

    @Type(() => Date)
    @ApiProperty()
    dataCreacion:Date;


    @Type(() => Date)
    @ApiProperty()
    dataAlteracion:Date;

    @IsString()
    @ApiProperty()
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

    @IsString()
    @ApiProperty()
    descripcion:string;

    /*@IsArray()
    servicios:Array<Servicio>*/


}