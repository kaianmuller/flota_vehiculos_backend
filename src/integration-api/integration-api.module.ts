import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { IntegrationApiService } from './integration-api.service';

@Module({
  imports:[
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Usuarios]),
    HttpModule,
    AuthModule,
  ],
  providers: [IntegrationApiService]
})
export class IntegrationApiModule {}
