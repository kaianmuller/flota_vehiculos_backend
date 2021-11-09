import { ApiProperty } from "@nestjs/swagger";
import {IsEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { DtoGeneric } from "src/shared/generic/dto-generic.dto";



export class UsuariosDto extends DtoGeneric{


    @ApiProperty()
    @IsString()
    nombre:string;

    @ApiProperty()
    @IsString()
    login:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    contrasena:string;

    @ApiProperty()
    @IsEnum(TipoUsuario)
    tipo_usuario:TipoUsuario;


}