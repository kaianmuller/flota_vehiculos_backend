import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString } from "class-validator";
import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { Column } from "typeorm";





export class UsuarioDto{

    @Type(() => Date)
    @ApiProperty()
    dataCreacion:Date;


    @Type(() => Date)
    @ApiProperty()
    dataAlteracion:Date;


    @IsString()
    @ApiProperty()
    nombre:string;

    @IsString()
    @ApiProperty()
    login:string;

    @IsString()
    @ApiProperty()
    contrasena:string;

    @IsEnum(TipoUsuario)
    @ApiProperty()
    tipoUsuario:TipoUsuario;

   /* @IsArray()
    servicios: Array<Servicio>*/

}