import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric.service';
import { Repository } from 'typeorm';
import { TiposServicioDto } from './tipos-servicio.dto';
import { TiposServicio } from './tipos-servicio.entity';

@Injectable()
export class TiposServicioService extends ServiceGeneric<TiposServicio,TiposServicioDto>{

    constructor(
        @InjectRepository(TiposServicio) readonly repository:Repository<TiposServicio>
    ){
        super(repository);
    }



}
