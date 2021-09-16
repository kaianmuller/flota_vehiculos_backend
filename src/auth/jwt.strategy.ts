
import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


import { JWTPayload } from './jwt.payload';
import { Usuario } from "src/usuario/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";




export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly usuarioService:UsuarioService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.SECRET_KEY,
        });

    }

async validate(payload: JWTPayload){
return {login:payload.login};
}




}