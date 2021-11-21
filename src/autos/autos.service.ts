import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/service-generic.service';
import { Between, ILike, In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { workerData } from 'worker_threads';
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


    async getAutoByChapa(chapa:string){
      return this.repository.findOne({where:{chapa:ILike(chapa)}});
    }


    async getSearch(){
        let dateI = "2021-11-05";
        let dateS = "2021-11-24";
        console.log('inferior: '+dateI);
        console.log('superior: ' +dateS);
        let word = 'au';
        return this.repository.find({descripcion:Like('%'+word.toUpperCase()+'%'),kilometraje:this.selectTypeFind(),fecha_alteracion:Between(dateI,dateS)});
    }


    selectTypeFind(){
        return MoreThan(70);
    }

}
