import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';


@Controller('login')
export class AuthController {

    constructor(private authServ:AuthService){} 


@Post()
@ApiBody({type:LoginDto})
async login(@Body() loginDto:LoginDto){
    const {login,contrasena} = loginDto;
    const valido = await this.authServ.validarUsuario(login,contrasena);
    if(!valido){
        throw new UnauthorizedException();
    }

    return await this.authServ.generarTokenAcceso(login);
}



}