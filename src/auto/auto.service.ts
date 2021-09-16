import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/ServiceGeneric';
import { Repository } from 'typeorm';
import { AutoDto } from './auto.dto';
import { Auto } from './auto.entity';

@Injectable()
export class AutoService extends ServiceGeneric<Auto,AutoDto>{


    constructor(
        @InjectRepository(Auto)
        readonly repository:Repository<Auto>
        ){
            super(repository);
        }



        async getAll(){
            return await this.repository.find({join: { alias: 'auto',  leftJoinAndSelect: { servicios: 'auto.servicios' } }});
        }


}
