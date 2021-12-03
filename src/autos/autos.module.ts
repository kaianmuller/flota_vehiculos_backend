import { Module } from '@nestjs/common';
import { AutosService } from './autos.service';
import { AutosController } from './autos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autos } from './autos.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Autos]),
    AuthModule
  ],
  providers: [AutosService],
  controllers: [AutosController]
})
export class AutosModule {}
