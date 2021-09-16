import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric';
import { Repository } from 'typeorm';
import { UsuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService extends ServiceGeneric<Usuario,UsuarioDto>{


    constructor(
        @InjectRepository(Usuario)
        readonly repository:Repository<Usuario>

    ){
        super(repository);
    }



    async getAll(){
        return await this.repository.find({join: { alias: 'usuario',  leftJoinAndSelect: { servicios: 'usuario.servicios' } }});
    }

    async getUsuarioByLogin(login:string){
        return await this.repository.findOne({login:login});
    }


}
