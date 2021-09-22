import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric';
import { Repository } from 'typeorm';
import { MovimientoDto } from './movimiento.dto';
import { Movimiento } from './movimiento.entity';

@Injectable()
export class MovimientoService extends ServiceGeneric<Movimiento,MovimientoDto>{


    constructor(
        @InjectRepository(Movimiento) readonly repository:Repository<Movimiento>
    ){
        super(repository);
    }
}
