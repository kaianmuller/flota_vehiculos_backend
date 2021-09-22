import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";




export class DtoGeneric{
    @Type(() => Date)
    @ApiProperty()
    dataCreacion:Date;


    @Type(() => Date)
    @ApiProperty()
    dataAlteracion:Date;

    @IsString()
    @ApiProperty()
    descripcion:string;
}