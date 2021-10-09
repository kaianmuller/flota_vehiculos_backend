import { IsString } from "class-validator";





export class ChangeUserPassDto{

    @IsString()
    login:string;

    @IsString()
    lastPass:string;

    @IsString()
    newPass:string;
}