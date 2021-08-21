import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoController } from './auto.controller';
import { Auto } from './auto.entity';
import { AutoService } from './auto.service';

@Module({
  imports:[TypeOrmModule.forFeature([Auto])],
  controllers: [AutoController],
  providers: [AutoService]
})
export class AutoModule {}
