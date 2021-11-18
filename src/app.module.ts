import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AutosModule } from './autos/autos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ServiciosModule } from './servicios/servicios.module';
import { AgendamientosModule } from './agendamientos/agendamientos.module';
import { TiposServicioModule } from './tipos-servicio/tipos-servicio.module';
import { IntegrationApiModule } from './integration-api/integration-api.module';

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
  AutosModule,
  UsuariosModule,
  ServiciosModule,
  AuthModule,
  AgendamientosModule,
  TiposServicioModule,
  IntegrationApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
