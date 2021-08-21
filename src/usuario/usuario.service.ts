import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {


    constructor(
        @InjectRepository(Usuario)
        private readonly repository:Repository<Usuario>

    ){}



    async getAll(){
        return await this.repository.find({join: { alias: 'usuario',  leftJoinAndSelect: { servicios: 'usuario.servicios' } }});
    }

    async getOne(id:number){
        const usuario =  await this.repository.findOne(id);
        if (!usuario) throw new NotFoundException('Usuario no existe');
        return usuario;
    }

    async createOne(dto:UsuarioDto){
        const usuario = this.repository.create(dto);
        return await this.repository.save(usuario);
    }

    async editOne(id:number,dto: UsuarioDto){
        const usuario = await this.repository.findOne(id);
        if (!usuario) throw new NotFoundException('Usuario no existe!');
        const editedUsuario = Object.assign(usuario, dto);
         return await this.repository.save(editedUsuario);

    }

    async deleteOne(id:number){
        return await this.repository.delete(id);
    }


}
