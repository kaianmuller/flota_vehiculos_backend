import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Utils } from 'src/shared/utils/Utils';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

constructor(private reportServ:ReportService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
  async   getReportServicios(@Query() query:any){
                const info = query.info && typeof query.info == "string"?JSON.parse(query.info):query.info;
                return await this.reportServ.getReportServicios(info);
               
    }





}
