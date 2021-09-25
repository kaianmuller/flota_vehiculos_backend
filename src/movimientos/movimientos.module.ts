import { Module } from '@nestjs/common';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './movimientos.entity';
import { MovimientosService } from './movimientos.service';

@Module({
  imports:[TypeOrmModule.forFeature([Movimientos])],
  providers: [MovimientosService],
  controllers: [MovimientosController]
})
export class MovimientosModule {}
