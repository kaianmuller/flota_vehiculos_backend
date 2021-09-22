import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString } from "class-validator";
import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { DtoGeneric } from "src/shared/generic/DtoGeneric";
import { Column } from "typeorm";





export class UsuarioDto extends DtoGeneric{



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

   @IsArray()
    servicios: Array<Servicio>

}