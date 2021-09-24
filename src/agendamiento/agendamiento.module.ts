import { Module } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { AgendamientoController } from './agendamiento.controller';
import { ConfigModule } from '@nestjs/config';
import { Agendamiento } from './agendamiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Agendamiento])],
  providers: [AgendamientoService],
  controllers: [AgendamientoController]
})
export class AgendamientoModule {}
