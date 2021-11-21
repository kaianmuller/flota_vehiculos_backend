import { All, Injectable, NotFoundException } from "@nestjs/common";
import { Any, Between, ILike, In, LessThanOrEqual, Like, MoreThanOrEqual, Not, Repository } from "typeorm";
const fs = require('fs');
@Injectable()
export class ServiceGeneric <E,EDto>{

    order:any = {id:"DESC"};

constructor(readonly repository:Repository<E>){
}

    async write(num:number){
        let opt = [];

        for(let i=0;i<num;i++){
            opt.push({username:i.toString(),nombre:'pepe',tipo_usuario:'ADMINISTRADOR',fecha_creacion:new Date()});
            if(i%2 == 0){
               opt.push({username:"dada"+i,nombre:'pepe',tipo_usuario:'ADMINISTRADOR',fecha_creacion:new Date()});
            }
        }

        

        const jsonString = JSON.stringify(opt);
       
     fs.writeFileSync('./userss.json',jsonString);
     return true;
    }
    
 



    async getAll(query:any){
            return await this.repository.find({order:this.order, skip:query.skip, take:query.take,where:this.searchOptions(query)});
    }

    async getOne(id:number){
        const e =  await this.repository.findOne(id);
        if (!e) throw new NotFoundException('Elemento no existe');
        return e;
    }

    async createOne(dto:EDto){
        const e = this.repository.create(dto);
        return await this.repository.save(e,{ chunk: 30 });
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

    async getCount(query:any){
            return await this.repository.count({where:this.searchOptions(query)});  
    }




    searchOptions(query:any):{[key:string]:any}{
        let options:{[key:string]:any} = {};
        let search:{[key:string]:any} = {};

        options = {};
        search = {};

        let queryOR = [];
    

        let jsonSearch:{[key:string]:any} = {};

        if(query.search){
        try {
            jsonSearch = JSON.parse(query.search);
        } catch (error) {
           console.log(error); 
        }
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
