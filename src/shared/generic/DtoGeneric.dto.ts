import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";




export class DtoGeneric{

    @ApiProperty()
    @Type(() => Date)
    fecha_creacion:Date;


    @ApiProperty()
    @Type(() => Date)
    fecha_alteracion:Date;

    @ApiProperty()
    @IsString()
    descripcion:string;
}