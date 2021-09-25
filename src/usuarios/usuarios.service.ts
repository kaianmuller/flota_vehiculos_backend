import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric.service';
import { Repository } from 'typeorm';
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
        return await this.repository.find({join: { alias: 'usuarios',  leftJoinAndSelect: { servicios: 'usuarios.servicios' } }});
    }

    async getUsuarioByLogin(login:string){
        return await this.repository.findOne({login:login});
    }


}
