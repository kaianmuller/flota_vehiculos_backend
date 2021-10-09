import { IsString } from "class-validator";





export class ChangeUserDto{

    @IsString()
    login:string;

    @IsString()
    lastPass:string;

    @IsString()
    newPass:string;
}