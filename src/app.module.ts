import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoModule } from './auto/auto.module';
import { ServicioModule } from './servicio/servicio.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pg1996',
    database: 'fautos',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
  AutoModule,
  UsuarioModule,
  ServicioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
