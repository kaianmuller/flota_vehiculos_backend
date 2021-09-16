import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioController } from './servicio.controller';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';

@Module({
  imports:[TypeOrmModule.forFeature([Servicio])],
  controllers: [ServicioController],
  providers: [ServicioService]
})
export class ServicioModule {}
