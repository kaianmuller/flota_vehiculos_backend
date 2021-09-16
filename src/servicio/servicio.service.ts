import { Injectable, NotFoundException } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { interval } from 'rxjs';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric';
import { Repository } from 'typeorm';
import { ServicioDto } from './servicio.dto';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServicioService extends ServiceGeneric<Servicio,ServicioDto>{


    constructor(
        @InjectRepository(Servicio)
        readonly repository:Repository<Servicio>
    ){
        super(repository);
    }


    async getAll(){
        return await this.repository.find({join: { alias: 'servicio',  leftJoinAndSelect: { usuario: 'servicio.usuario', auto: 'servicio.auto' }, }});
    }




}
