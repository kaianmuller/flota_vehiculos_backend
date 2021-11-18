import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class IntegrationApiService {


constructor(private http:HttpService){

}

    @Interval(10000)
    handleInterval() {
      this.getAll().subscribe((res)=>{
          console.log(res.data);
      });
    }


    getAll():Observable<AxiosResponse<any[]>>{
    
        return this.http.get('http://localhost:3000/autos',{ headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFwIiwiaWF0IjoxNjM3MjExMTE0LCJleHAiOjE2MzcyMTgzMTR9.LOcOh_QE8YHZquzN-rIy_Dlb85wc5Oe30pIRLvkkRM4`}});
    }


}
