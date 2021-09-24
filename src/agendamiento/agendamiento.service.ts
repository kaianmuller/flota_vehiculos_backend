import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric';
import { Repository } from 'typeorm';
import { AgendamientoDto } from './agendamiento.dto';
import { Agendamiento } from './agendamiento.entity';

@Injectable()
export class AgendamientoService extends ServiceGeneric<Agendamiento,AgendamientoDto>{


constructor(
@InjectRepository(Agendamiento) 
readonly repository:Repository<Agendamiento>
){
    super(repository);
}


async getAll(){
    return await this.repository.find({join: { alias: 'agendamiento',  leftJoinAndSelect: { servicio: 'agendamiento.servicio' } }});
}



}
