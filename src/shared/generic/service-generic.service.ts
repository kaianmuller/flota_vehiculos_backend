import { All, Injectable, NotFoundException } from "@nestjs/common";
import { Any, Between, ILike, In, LessThanOrEqual, Like, MoreThanOrEqual, Not, Repository } from "typeorm";
import { Utils } from "../utils/Utils";

@Injectable()
export class ServiceGeneric <E,EDto>{

    order:any = {id:"DESC"};

constructor(readonly repository:Repository<E>){
}

  


    async getAll(query?:any){
        if(query){
            return await this.repository.find({join: {alias: 'a',leftJoinAndSelect: this.setLeftJoin(query)},
            order:this.order, skip:query.skip, take:query.take,where:this.searchOptions(query)});
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

    async getCount(query?:any){
            if(query){
            return await this.repository.count({join: {alias: 'a',leftJoinAndSelect: this.setLeftJoin(query)},
            where:this.searchOptions(query)});  
            }else{
                return await this.repository.count();   
            }
    }



    setLeftJoin(query:any):{[key:string]:any}{
        let leftJoin = {};
        if(query.join && query.join.length > 0){
            query.join.forEach((e:string) => {
            leftJoin[e] = 'a.'+e; 
            });
        }
        return leftJoin;
    }


    searchOptions(query:any):{[key:string]:any}{
        let options:{[key:string]:any} = {};
        let search:{[key:string]:any} = {};
        
        let queryAlias = [];
        let queryOR = [];



        let jsonSearch:{[key:string]:any} = {};

        if(query.search){
        try {
            jsonSearch = JSON.parse(query.search);
        } catch (error) {
           console.log(error); 
        }
        }


    for(let key in jsonSearch){  // procesar el grupo principal sin los alias

        if(jsonSearch[key]){
            if(key != 'alias'){
                if( typeof jsonSearch[key] != 'string'){
                    if(jsonSearch[key].value){
                        Object.assign(options,{[key]:jsonSearch[key].value});
                    }else if(jsonSearch[key].min || jsonSearch[key].max){
                        Object.assign(options,this.getObjectQueryNumber(key,jsonSearch[key]));
                    }else if(jsonSearch[key].from || jsonSearch[key].to){
                        Object.assign(options,this.getObjectQueryDate(key,jsonSearch[key]));
                    }
                }else if(jsonSearch[key].length > 0){
                    Object.assign(search,{[key]:ILike('%'+jsonSearch[key]+'%')});
                }


            }else{
                    //procesar el grupo de alias


                let alias:{[key:string]:any} = {};
                for(let ke in jsonSearch[key]){
                    alias[jsonSearch[key][ke].alias] = {search:{},options:{}};
                }


                for(let k in jsonSearch[key]){
                   if( typeof jsonSearch[key][k].target != 'string'){
                        if(jsonSearch[key][k].target.value){
                            Object.assign(alias[jsonSearch[key][k].alias].options,{[k]:jsonSearch[key][k].target.value});
                        }else if(jsonSearch[key][k].target.min || jsonSearch[key][k].target.max){
                            Object.assign(alias[jsonSearch[key][k].alias].options,{[k]:this.getObjectQueryNumber(k,jsonSearch[key][k].target)});
                        }else if(jsonSearch[key][k].target.from || jsonSearch[key][k].target.to){
                            Object.assign(alias[jsonSearch[key][k].alias].options,{[k]:this.getObjectQueryDate(k,jsonSearch[key][k].target)});
                        }
                    }else if(jsonSearch[key][k].target.length > 0){
                            Object.assign(alias[jsonSearch[key][k].alias].search,{[k]:{alias:jsonSearch[key][k].alias,target:ILike('%'+jsonSearch[key][k].target+'%')}});
                        }
                }

              

            for(let a in alias){
                if(Object.values(alias[a].search).length > 0){
                    for(let k in alias[a].search){
                        let o = {[a]:{}};
                        Object.assign(o[a],{[k]:alias[a].search[k].target});
                        Object.assign(o[a],alias[a].options);
                     if(!Utils.isEmpty(o[a])){queryAlias.push(o)};
                    }
                }else{
                    if(!Utils.isEmpty(alias[a].options)){queryAlias.push({[a]:alias[a].options})}
                }
            }

            //fin del proceso del grupo de alias


            }
        }
    }

if(queryAlias.length > 0){
    for(let q of queryAlias){
            Object.assign(q,options);
            queryOR.push(q);
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
       if(!Utils.isEmpty(options) && queryAlias.length == 0){ queryOR.push(options)}
    }



  // console.log(queryOR);

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
