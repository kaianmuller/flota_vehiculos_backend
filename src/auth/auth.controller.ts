import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authServ:AuthService){} 


@Post('login')
async login(@Body() loginDto:LoginDto){

    const {login,contrasena} = loginDto;
    
    const valido =  await this.authServ.validarUsuario(login,contrasena).catch(()=>false);

    if(!valido){
        throw new UnauthorizedException("No es un usuario valido!");
    }

    return await this.authServ.generarTokenAcceso(login);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post('check')
async checkToken(@Body() token:any){
return await this.authServ.checkToken(token);
}


}
