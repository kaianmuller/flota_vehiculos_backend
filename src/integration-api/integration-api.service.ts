import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class IntegrationApiService {


constructor(private http:HttpService){

}

    @Interval(10000)
    handleInterval() {
      console.log("testSchedule");
      
    }


    getAll():Observable<AxiosResponse<any[]>>{
        return this.http.get('http://localhost:3000/cats');
    }


}
