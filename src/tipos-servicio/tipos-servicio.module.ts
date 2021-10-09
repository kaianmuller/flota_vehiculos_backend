import { Module } from '@nestjs/common';
import { TiposServicioService } from './tipos-servicio.service';
import { TiposServicioController } from './tipos-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposServicio } from './tipos-servicio.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposServicio])],
  providers: [TiposServicioService],
  controllers: [TiposServicioController]
})
export class TiposServicioModule {}
