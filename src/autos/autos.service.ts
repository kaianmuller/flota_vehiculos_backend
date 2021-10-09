import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric.service';
import { Repository } from 'typeorm';
import { AutosDto } from './autos.dto';
import { Autos } from './autos.entity';

@Injectable()
export class AutosService extends ServiceGeneric<Autos,AutosDto>{


    constructor(
        @InjectRepository(Autos)
        readonly repository:Repository<Autos>
        ){
            super(repository);
        }



        async getAll(){
            return await this.repository.find({join: { alias: 'autos',  leftJoinAndSelect: { movimientos: 'autos.movimientos' } }});
        }


}
