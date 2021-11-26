import { Injectable, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TipoUsuario } from './enums/tipo-usuario.enum';
import { UsuariosDto } from './usuarios/usuarios.dto';
import { UsuariosService } from './usuarios/usuarios.service';

@Injectable()
export class AppService implements OnModuleInit{

constructor(private usuarioServ:UsuariosService){}




onModuleInit(){
  this.initRootUser();
}


  getHello(): string {
    return "Bienvenido al servidor Flota de Vehiculos!";
  }





  async initRootUser(){
    await this.usuarioServ.getCount({search:JSON.stringify({tipo_usuario:'ADMINISTRADOR'})}).then((r)=>{
        if(r <= 0){
            let rootUser = new UsuariosDto();
            rootUser.login = 'root',
            rootUser.nombre = 'root',
            rootUser.contrasena = process.env.PASS_ROOT,
            rootUser.tipo_usuario = TipoUsuario.ADMINISTRADOR,
            rootUser.fecha_creacion =  new Date(),
          this.usuarioServ.createOne(rootUser);
        }
    });
  }
}
