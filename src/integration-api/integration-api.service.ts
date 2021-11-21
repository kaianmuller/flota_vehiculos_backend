import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { TipoUsuario } from 'src/enums/tipo-usuario.enum';
import { Utils } from 'src/shared/utils/Utils';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { ILike, In, Repository } from 'typeorm';

const fs = require('fs');
const readline = require('readline');

@Injectable()
export class IntegrationApiService {


constructor(private http:HttpService,private authServ:AuthService,@InjectRepository(Usuarios) readonly repository:Repository<Usuarios>){}


    config = {
        ref:'login',
        convert:[
            {from:'login',to:'login'},
            {from:'nombre',to:'nombre'},
        ]
    }

    usuarioApi = {login:'bm1',password:'bm1'};




    
    @Interval(10000)
    integrateApi() {

    //this.verifyData(this.readJSON());

    this.getToken().subscribe({
    next:(v:any)=>{this.getDataFromApi(v.data.access_token).subscribe({
                    next: (v:any) => this.verifyData(v.data),
                    error: (e) => this.writeInLine("Error al traer los datos!"),    
                    });
    },
    error:(e)=>this.writeInLine("Error al authenticarse con la api!"),
    });


    
    }


    getDataFromApi(token:string):Observable<AxiosResponse<any[]>>{
        return this.http.get('http://'+Utils.ipApi()+'/usuarios',{ headers: {"Authorization" : `Bearer `+ token}});
    }



    getToken():Observable<AxiosResponse<any[]>>{
        return this.http.post('http://'+Utils.ipApi()+'/login',this.usuarioApi);
    }



//Metodo de verificacion
    async verifyData(data:Array<any>){

        this.writeInLine('Verificion grupal...')


        let size = 100;
        let datas = [];
        for (let i=0; i<data.length; i+=size) {
             datas.push(data.slice(i,i+size));
        }
      
        let flag = false;
        for (let i=0; (i<datas.length) && !flag; i++) {
  
              flag  = await this.verifyGroup(this.config.ref,datas[i]);

             this.writeProgressBar(Math.round((i*100)/datas.length));
          }
    this.writeInLine(flag?"Nuevos elementos insertados!":"No hay elementos Nuevos!");
    return flag?true:false;
  
    }




    //verificacion de grupo
    async verifyGroup(field:string,datas:Array<any>){

        let flag = false;
       
        let resp = await this.repository.find({where:{login:In(datas.map((v:any) => v[field]))}});

            let logins = resp.map(v=>v.login.toLowerCase());

            let result = datas.filter(v=> (v[field] && !logins.includes(v[field].toLowerCase())))
            
            result = result.map(v => this.convert(v));
            
            if(result.length > 0){
            let users:Usuarios[] = this.repository.create(result);
            flag =  await this.repository.save(users).then(()=>{return true}).catch((e)=>{return null});
            }
       
       return flag;
        
    }

//convertir objeto a entidad
    convert(obj:any){
    

        let converted:Usuarios = new Usuarios();
        for(let c of this.config.convert){
            converted[c.to] = obj[c.from];
        }

        converted.fecha_creacion = new Date();
        converted.tipo_usuario = TipoUsuario.USUARIO;
        converted.descripcion = "Integrado del API externo!"

        return converted;
    }



    readJSON(){
        return  JSON.parse(fs.readFileSync('./userss.json','utf8'));
    }

    
 writeInLine(text:string) {
    
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(text);
}


writeProgressBar(percent:number){
    this.writeInLine("Verificando: "+percent+" %");
}







}
