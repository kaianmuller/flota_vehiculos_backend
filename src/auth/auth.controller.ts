import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';


@ApiTags('Login')
@Controller('login')
export class AuthController {

    constructor(private authServ:AuthService){} 


@Post()
async login(@Body() loginDto:LoginDto){
    const {login,contrasena} = loginDto;
    const valido = await this.authServ.validarUsuario(login,contrasena);
    if(!valido){
        throw new UnauthorizedException("No es un usuario valido!");
    }

    return await this.authServ.generarTokenAcceso(login);
}



}
