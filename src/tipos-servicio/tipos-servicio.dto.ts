import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TiposServicioDto{

    @ApiProperty()
    @IsNumber()
    id:number;

    @ApiProperty()
    @IsString()
    descripcion:string;
    
}