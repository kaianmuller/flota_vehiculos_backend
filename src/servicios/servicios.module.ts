import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicios } from './servicios.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Servicios]),
    AuthModule
  ],
  providers: [ServiciosService],
  controllers: [ServiciosController],
  exports:[ServiciosService]
})
export class ServiciosModule {}
