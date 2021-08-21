import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Auto } from "src/auto/auto.entity";
import { TipoServicio } from "src/enums/tipo-servicio.enum";
import { Usuario } from "src/usuario/usuario.entity";




export class ServicioDto{

    @IsString()
    @ApiProperty()
    descripcion:string;

    @IsEnum(TipoServicio)
    @ApiProperty()
    tipoServicio:TipoServicio;

    @IsNumber()
    @ApiProperty()
    valorServicio:number;

    @Type(()=>Date)
    @ApiProperty()
    fechaServicio:Date;

    @IsNumber()
    @ApiProperty()
    kmInicial:number;

    @IsNumber()
    @ApiProperty()
    kmFinal:number;

    @ApiProperty()
    usuario:Usuario;

    @ApiProperty()
    auto:Auto;

}