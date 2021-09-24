import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoModule } from './auto/auto.module';
import { ServicioModule } from './servicio/servicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MovimientoModule } from './movimiento/movimiento.module';
import { TipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pg1996',
    database: 'fautos',
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    logger: 'file',
  }),
  AutoModule,
  UsuarioModule,
  ServicioModule,
  AuthModule,
  MovimientoModule,
  TipoServicioModule,
  AgendamientoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
