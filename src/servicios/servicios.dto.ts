
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { type } from "os";
import { Autos } from "src/autos/autos.entity";
import { EstadoServicio } from "src/enums/estado-servicio.enum";
import { DtoGeneric } from "src/shared/generic/dto-generic.dto";
import { TiposServicio } from "src/tipos-servicio/tipos-servicio.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";





export class ServiciosDto extends DtoGeneric{


    @ApiProperty()
    @Type(()=>Date)
    fecha_inicio:Date;

    @ApiProperty()
    @IsOptional()
    @Type(()=>Date)
    fecha_fin:Date;

    @ApiProperty()
    @IsNumber()
    km_inicial:number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    km_final:number;


    @ApiProperty()
    @IsOptional()
    @IsNumber()
    valor_servicio:number;

    @ApiProperty()
    @IsEnum(EstadoServicio)
    estado:EstadoServicio;

    @ApiProperty()
    @Type(()=>TiposServicio)
    tipo_servicio:TiposServicio;

    @ApiProperty()
    @Type(()=>Autos)
    auto:Autos;

    @ApiProperty()
    @Type(()=>Usuarios)
    usuario:Usuarios;


}