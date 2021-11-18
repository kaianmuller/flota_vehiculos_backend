import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { IntegrationApiService } from './integration-api.service';

@Module({
  imports:[
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [IntegrationApiService]
})
export class IntegrationApiModule {}
