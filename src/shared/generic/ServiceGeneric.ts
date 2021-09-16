import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";


export class ServiceGeneric <E,EDto>{

constructor(readonly repository:Repository<E>){

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
        const editedAuto = Object.assign(e, dto);
         return await this.repository.save(editedAuto);

    }

    async deleteOne(id:number){
        return await this.repository.delete(id);
    }
}