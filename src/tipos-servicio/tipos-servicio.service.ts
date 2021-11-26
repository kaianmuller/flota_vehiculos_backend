import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/service-generic.service';
import { ILike, Repository } from 'typeorm';
import { TiposServicioDto } from './tipos-servicio.dto';
import { TiposServicio } from './tipos-servicio.entity';

@Injectable()
export class TiposServicioService extends ServiceGeneric<TiposServicio,TiposServicioDto>{

    constructor(
        @InjectRepository(TiposServicio) readonly repository:Repository<TiposServicio>
    ){
        super(repository);
    }



    async getTipoByDescripcion(descripcion:string){
        return await this.repository.findOne({where:{descripcion:ILike(descripcion)}});
    }


}
