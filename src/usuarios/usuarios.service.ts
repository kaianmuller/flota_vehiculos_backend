import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/service-generic.service';
import { Repository } from 'typeorm';
import { ChangeUserPassDto } from './change-user-pass.dto';
import { UsuariosDto } from './usuarios.dto';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService extends ServiceGeneric<Usuarios,UsuariosDto>{


    constructor(
        @InjectRepository(Usuarios)
        readonly repository:Repository<Usuarios>

    ){
        super(repository);
    }


    async getUsuarioByLogin(login:string){
        return await this.repository.findOne({login:login});
    }

    
    async changePassword(dto:ChangeUserPassDto) {

        let usuario = await this.repository.findOne({login:dto.login});


        if (!usuario || !await usuario.validarPassword(dto.act_pass)) throw new NotFoundException('Error al cambiar el password!');
        
        let editUser = usuario;
        editUser.contrasena = dto.new_pass;
        editUser.fecha_alteracion = dto.fecha_alteracion;

        const editedUser  = Object.assign(usuario,editUser);
        
        return await this.repository.save(editedUser);
    }

}
