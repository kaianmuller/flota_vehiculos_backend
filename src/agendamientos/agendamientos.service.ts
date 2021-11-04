import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric.service';
import { Repository } from 'typeorm';
import { AgendamientosDto } from './agendamientos.dto';
import { Agendamientos } from './agendamientos.entity';

@Injectable()
export class AgendamientosService extends ServiceGeneric<Agendamientos,AgendamientosDto>{


    constructor(
    @InjectRepository(Agendamientos) 
    readonly repository:Repository<Agendamientos>
    ){
        super(repository);
    }
    
    
    
    
    }
