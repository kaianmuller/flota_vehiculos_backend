import { Module } from '@nestjs/common';
import { ServiciosModule } from 'src/servicios/servicios.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports:[ServiciosModule],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
