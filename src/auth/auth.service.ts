import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {


    constructor(private usuarioServ:UsuarioService,private jwtService: JwtService){}

async validarUsuario(login:string,contrasena:string){
    const usuario = await this.usuarioServ.getUsuarioByLogin(login);
    return await usuario.validarPassword(contrasena);
}

async generarTokenAcceso(login:string){
    const usuario = await this.usuarioServ.getUsuarioByLogin(login);
    const payload: JWTPayload = {login:usuario.login};
    return {access_token:this.jwtService.sign(payload)};
}


}
