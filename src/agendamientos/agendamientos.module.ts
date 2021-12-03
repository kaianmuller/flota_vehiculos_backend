import { Module } from '@nestjs/common';
import { AgendamientosService } from './agendamientos.service';
import { AgendamientosController } from './agendamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamientos } from './agendamientos.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Agendamientos]),
  AuthModule
],
  providers: [AgendamientosService],
  controllers: [AgendamientosController]
})
export class AgendamientosModule {}
