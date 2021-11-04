import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class ServiceGeneric <E,EDto>{

constructor(readonly repository:Repository<E>){

}
    

    async getAll(skip:number,take:number){
        if(skip && take){
        return await this.repository.find({skip:skip,take:take});
        }else{
        return await this.repository.find();   
        }
    }

    async getOne(id:number){
        const e =  await this.repository.findOne(id);
        if (!e) throw new NotFoundException('Elemento no existe');
        return e;
    }

    async createOne(dto:EDto){
        const e = this.repository.create(dto);
        return await this.repository.save(e);
    }

    async editOne(id:number,dto: EDto){
        const e = await this.repository.findOne(id);
        if (!e) throw new NotFoundException('Elemento no existe!');
        const editedE = Object.assign(e, dto);
         return await this.repository.save(editedE);

    }

    async deleteOne(id:number){
        return await this.repository.delete(id);
    }

    async getCount(){
       return await this.repository.count();
    }
}