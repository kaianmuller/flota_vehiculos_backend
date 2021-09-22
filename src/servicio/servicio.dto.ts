import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Auto } from "src/auto/auto.entity";
import { DtoGeneric } from "src/shared/generic/DtoGeneric";
import { Usuario } from "src/usuario/usuario.entity";




export class ServicioDto extends DtoGeneric{


    @ApiProperty()
    tipoServicio:string;

    @ApiProperty()
    usuario:Usuario;

    @ApiProperty()
    auto:Auto;

}