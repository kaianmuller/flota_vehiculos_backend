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
            opt.push({login:i.toString(),nombre:'pepe',tipo_usuario:'ADMINISTRADOR',fecha_creacion:new Date()});
            if(i%2 == 0){
               opt.push({login:"dada"+i,nombre:'pepe',tipo_usuario:'ADMINISTRADOR',fecha_creacion:new Date()});
            }
        }

        

        const jsonString = JSON.stringify(opt);
       
     fs.writeFileSync('./userss.json',jsonString);

     return true;
        
    }
    
    async compare(){
        let opt:Array<any> = [];

      opt = JSON.parse(fs.readFileSync('./userss.json', "utf8"));

      let size = 10000;
      let opts = [];
      for (let i=0; i<opt.length; i+=size) {
           opts.push(opt.slice(i,i+size));
      }
    
    

      let flag = false;
      for (let i=0; i<opts.length; i++) {

            if(await this.compar('login',opts[i])){
                flag = true;
            }
        }

   return flag?"Nuevos elementos insertados!":"No hay elementos Nuevos!";

    }


   async compar(field:string,opt:Array<any>){
  
     return await this.repository.find({where:{login:In(opt.map(r => r.login))}}).then((res)=>{
        let res_logins = res.map((r:any) => r.login);
        var result = opt.filter(element => !(res_logins.includes(element[field])));
        if(result.length > 0){
         this.repository.save(result,{chunk:1000});
        return true;
        }else{
        return false;
        }
     });
     
    }



    async getAll(query:any){
        if(query.search && query.skip && query.take){
            return await this.repository.find({order:this.order, skip:query.skip, take:query.take,where:this.searchOptions(query)});
        }else if(query.skip && query.take){
        return await this.repository.find({order:this.order, skip:query.skip, take:query.take});
        }else if(query.search){
            return await this.repository.find({order:this.order, where:this.searchOptions(query)});
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
