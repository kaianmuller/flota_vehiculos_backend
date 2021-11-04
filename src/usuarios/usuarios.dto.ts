import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsString } from "class-validator";
import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { DtoGeneric } from "src/shared/generic/DtoGeneric.dto";





export class UsuariosDto extends DtoGeneric{


    @ApiProperty()
    @IsString()
    nombre:string;

    @ApiProperty()
    @IsString()
    login:string;

    @ApiProperty()
    @IsString()
    contrasena:string;

    @ApiProperty()
    @IsEnum(TipoUsuario)
    tipo_usuario:TipoUsuario;


}