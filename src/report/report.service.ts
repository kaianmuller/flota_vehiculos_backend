import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { EstadoServicio } from 'src/enums/estado-servicio.enum';
import { Servicios } from 'src/servicios/servicios.entity';
import { ServiciosService } from 'src/servicios/servicios.service';
import { Utils } from 'src/shared/utils/Utils';

@Injectable()
export class ReportService {


constructor(private serviciosServ:ServiciosService){}






    async getReportServicios(info:any){
        if(info.type == 'G'){
            if(info.period){
                let typePeriod = this.getTypePeriod(info.period);
                return await this.serviciosServ.getAll(this.getQuery(typePeriod,info.period)).then((data:Array<Servicios>)=>{return this.calcularPeriodo(info.ref,typePeriod,info.period,data)});
            }else{
            return await this.serviciosServ.getAll(this.getQuery()).then((data:Array<Servicios>)=>{return this.calcularTotal(info.ref,data)});
            }
        }
    }


    calcularPeriodo(ref:string,typePeriod:string,period:any,data:Array<Servicios>){
    
    let dataYear = this.initArray(12);
    let dataMonth = this.initArray(32);
      

    data.forEach((v:Servicios)=>{
        if(typePeriod == 'Y'){
            for(let i=0;i<12;i++){
                if(v.fecha_alteracion.getMonth() == i){
                    dataYear[i] += Number(v[ref]);
                }
            }
        }else if(typePeriod == 'M'){

        }
    });
        
    return typePeriod == 'Y'?dataYear:dataMonth;
    }


    calcularTotal(ref:string,data:Array<Servicios>){
        let total = 0;
        data.forEach((v:Servicios) =>{
            total+=Number(v[ref]);
        });
        return total;
    }


    getTypePeriod(period:any){
        if(period.month){
            return 'M';
        }
            return 'Y';
    }

    getQuery(typePeriod?:string,period?:any){

        let estado = {value:EstadoServicio.FINALIZADO};
        if(period && typePeriod){
        let fecha_alteracion = {from:Utils.getTimeStart(typePeriod,Utils.getDateWithObj(period)),
                                to:Utils.getTimeEnd(typePeriod,Utils.getDateWithObj(period))};
        return {search:{estado:estado,fecha_alteracion:fecha_alteracion}};
        }

        return {search:{estado:estado}}; 
    }


    initArray(num:number){
        let array = [];
        for(let i=0;i<num;i++){
            array[i] = 0;
        }
        return array;
    }


}
