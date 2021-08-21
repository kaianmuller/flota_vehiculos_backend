import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoDto } from './auto.dto';
import { Auto } from './auto.entity';

@Injectable()
export class AutoService {


    constructor(
        @InjectRepository(Auto)
        private readonly repository:Repository<Auto>
        ){}



        async getAll(){
            return await this.repository.find({join: { alias: 'auto',  leftJoinAndSelect: { servicios: 'auto.servicios' } }});
        }

        async getOne(id:number){
            const auto =  await this.repository.findOne(id);
            if (!auto) throw new NotFoundException('Auto no existe');
            return auto;
        }

        async createOne(dto:AutoDto){
            const auto = this.repository.create(dto);
            return await this.repository.save(auto);
        }

        async editOne(id:number,dto: AutoDto){
            const auto = await this.repository.findOne(id);
            if (!auto) throw new NotFoundException('Auto no existe!');
            const editedAuto = Object.assign(auto, dto);
             return await this.repository.save(editedAuto);

        }

        async deleteOne(id:number){
            return await this.repository.delete(id);
        }




}
