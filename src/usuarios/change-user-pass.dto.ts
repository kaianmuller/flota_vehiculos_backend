import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";





export class ChangeUserPassDto{

    
    @ApiProperty()
    @Type(() => Date)
    fecha_alteracion:Date;

    @ApiProperty()
    @IsString()
    login:string;

    @ApiProperty()
    @IsString()
    act_pass:string;

    @ApiProperty()
    @IsString()
    new_pass:string;
}