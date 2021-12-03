import { Module } from '@nestjs/common';
import { TiposServicioService } from './tipos-servicio.service';
import { TiposServicioController } from './tipos-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposServicio } from './tipos-servicio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([TiposServicio]),
    AuthModule
  ],
  providers: [TiposServicioService],
  controllers: [TiposServicioController]
})
export class TiposServicioModule {}
