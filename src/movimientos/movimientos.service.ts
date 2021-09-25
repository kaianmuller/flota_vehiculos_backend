import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric.service';
import { Repository } from 'typeorm';
import { MovimientosDto } from './movimientos.dto';
import { Movimientos } from './movimientos.entity';

@Injectable()
export class MovimientosService extends ServiceGeneric<Movimientos,MovimientosDto>{


    constructor(
        @InjectRepository(Movimientos) readonly repository:Repository<Movimientos>
    ){
        super(repository);
    }

    async getAll(){
        return await this.repository.find({join: { alias: 'movimientos',  leftJoinAndSelect: { servicio: 'movimientos.servicio'}}},);
    }

}