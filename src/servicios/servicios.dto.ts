import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { AutosDto } from "src/autos/autos.dto";
import { Autos } from "src/autos/autos.entity";
import { DtoGeneric } from "src/shared/generic/DtoGeneric.dto";
import { UsuariosDto } from "src/usuarios/usuarios.dto";
import { Usuarios } from "src/usuarios/usuarios.entity";




export class ServiciosDto extends DtoGeneric{

    @ApiProperty()
    @IsString()
    tipo_servicio:string;
    
    @ApiProperty({type:UsuariosDto})
    usuario_creador:Usuarios;

    @ApiProperty({type:AutosDto})
    auto:Autos;

}