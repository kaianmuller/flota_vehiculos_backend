import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric.service';
import { Repository } from 'typeorm';
import { ChangeUserDto } from './change-user.dto';
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



    async getAll(){
        return await this.repository.find({join: { alias: 'usuarios',  leftJoinAndSelect: { servicios: 'usuarios.servicios'} }});
    }

    async getUsuarioByLogin(login:string){
        return await this.repository.findOne({login:login});
    }

    async changePassword(dto:ChangeUserDto) {

        let usuario = await this.repository.findOne({login:dto.login});

        let validLastPass = await usuario.validarPassword(dto.lastPass);

        if (!usuario || !validLastPass) throw new NotFoundException('Error al cambiar el password!');
        
        let editUser = usuario;
        editUser.contrasena = dto.newPass;

        const editedUser  = Object.assign(usuario,editUser);
        
        return await this.repository.save(editedUser);
    }

}
