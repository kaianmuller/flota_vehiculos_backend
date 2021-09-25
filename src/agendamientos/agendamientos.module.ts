import { Module } from '@nestjs/common';
import { AgendamientosService } from './agendamientos.service';
import { AgendamientosController } from './agendamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamientos } from './agendamientos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Agendamientos])],
  providers: [AgendamientosService],
  controllers: [AgendamientosController]
})
export class AgendamientosModule {}
