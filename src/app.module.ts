import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoModule } from './auto/auto.module';

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
  AutoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
