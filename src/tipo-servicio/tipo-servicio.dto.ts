import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TipoServicioDto{


    @IsNumber()
    @ApiProperty()
    id:number;

    @IsString()
    @ApiProperty()
    descripcion:string;
}