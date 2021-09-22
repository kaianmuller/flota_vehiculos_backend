import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric';
import { Repository } from 'typeorm';
import { TipoServicioDto } from './tipo-servicio.dto';
import { TipoServicio } from './tipo-servicio.entity';

@Injectable()
export class TipoServicioService extends ServiceGeneric<TipoServicio,TipoServicioDto>{

    constructor(
        @InjectRepository(TipoServicio) repository:Repository<TipoServicio>
    ){
        super(repository);
    }

    
    async getAll(){
        return await this.repository.find();
    }
}
