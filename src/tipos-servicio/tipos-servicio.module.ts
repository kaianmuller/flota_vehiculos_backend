import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposServicioController } from './tipos-servicio.controller';
import { TiposServicio } from './tipos-servicio.entity';
import { TiposServicioService } from './tipos-servicio.service';

@Module({
  imports:[TypeOrmModule.forFeature([TiposServicio])],
  controllers: [TiposServicioController],
  providers: [TiposServicioService]
})
export class TiposServicioModule {}
