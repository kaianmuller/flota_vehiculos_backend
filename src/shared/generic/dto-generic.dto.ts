import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";




export class DtoGeneric{

    @ApiProperty()
    @IsOptional()
    @Type(() => Date)
    fecha_creacion:Date;


    @ApiProperty()
    @IsOptional()
    @Type(() => Date)
    fecha_alteracion:Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    descripcion:string;
}