import { Injectable, NotFoundException } from "@nestjs/common";
import { Between, ILike, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from "typeorm";

@Injectable()
export class ServiceGeneric <E,EDto>{

    order:any = {id:"DESC"};

constructor(readonly repository:Repository<E>){
}
    

    async getAll(query:any){
        if(query.search && query.skip && query.take){
            return await this.repository.find({order:this.order, skip:query.skip, take:query.take,where:this.searchOptions(query)});
        }else if(query.skip && query.take){
        return await this.repository.find({order:this.order, skip:query.skip, take:query.take});
        }else{
        return await this.repository.find({});   
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




    searchOptions(query:any):{[key:string]:any}{
        let options:{[key:string]:any} = {};
        let search:{[key:string]:any} = {};

        options = {};
        search = {};

        let queryOR = [];
    

        let jsonSearch:{[key:string]:any} = {};

        try {
            jsonSearch = JSON.parse(query.search);
        } catch (error) {
           console.log(error); 
        }
       
       
        for(let k in jsonSearch){
            
            if(jsonSearch[k]){
                if( typeof jsonSearch[k] != 'string'){
                    if(jsonSearch[k].value){
                        Object.assign(options,{[k]:jsonSearch[k].value});
                    }else if(jsonSearch[k].min || jsonSearch[k].max){
                        Object.assign(options,this.getObjectQueryNumber(k,jsonSearch[k]));
                    }else if(jsonSearch[k].from || jsonSearch[k].to){
                        Object.assign(options,this.getObjectQueryDate(k,jsonSearch[k]));
                    }
                }else{
                    Object.assign(search,new Object({[k]:ILike('%'+jsonSearch[k]+'%')}));
                }
            }
        }

        
    if(Object.values(search).length > 0){
        for(let k in search){
            let o = {};
            Object.assign(o,{[k]:search[k]});
            Object.assign(o,options);
            queryOR.push(o);
        }
    }else{
        queryOR.push(options);
    }


        console.log(queryOR);
        return queryOR;
    }



    getObjectQueryNumber(key:string,target:any){
        if(target.min != null && target.max !=null){
            return {[key]:Between(target.min,target.max)}
        }else if(target.min != null && target.max == null){
            return {[key]:MoreThanOrEqual(target.min)}
        }else if(target.min == null && target.max != null){
            return {[key]:LessThanOrEqual(target.max)}
        }

        return{};
    }

    getObjectQueryDate(key:string,target:any){
        if(target.from != null && target.to !=null){
            return {[key]:Between(target.from,target.to)}
        }else if(target.from != null && !target.to){
            return {[key]:MoreThanOrEqual(target.from)}
        }else if(!target.from && target.to != null){
            return {[key]:LessThanOrEqual(target.to)}
        }

        return{};
    }


}
