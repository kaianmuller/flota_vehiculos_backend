import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TipoUsuario } from 'src/enums/tipo-usuario.enum';
import { Utils } from 'src/shared/utils/Utils';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {


    constructor(private usServ:UsuariosService,private jwtService: JwtService){}

async validarUsuario(login:string,contrasena:string){
    const usuario = await this.usServ.getUsuarioByLogin(login);
    if(!usuario){
        return false;
    }
    return await usuario.validarPassword(contrasena);
}

async generarTokenAcceso(login:string){
    const usuario = await this.usServ.getUsuarioByLogin(login);
    const payload: JWTPayload = {login:usuario.login,rol:usuario.tipo_usuario};
    return {token:this.jwtService.sign(payload)};
}


async checkToken(token:any){
 try{
    return this.jwtService.verify(token.jwt,{secret:process.env.SECRET_KEY});
 }catch(e){
     console.log(e);
    return false
 }
}


async isTokenAdmin(headers:any){
    const rol = await this.checkToken({jwt:Utils.getAuthorizationToken(headers)}).then((result)=>{return result.rol});
    return  rol == TipoUsuario.ADMINISTRADOR;
}  

}
