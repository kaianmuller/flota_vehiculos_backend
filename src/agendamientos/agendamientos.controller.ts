import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AgendamientosDto } from './agendamientos.dto';
import { Agendamientos } from './agendamientos.entity';
import { AgendamientosService } from './agendamientos.service';

@ApiTags('Agendamientos')
@Controller('agendamientos')
export class AgendamientosController{


    constructor(private readonly service:AgendamientosService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('count')
    async getCount(){
        return await this.service.getCount();
    }
    
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(@Query() query:any){
        return await this.service.getAll(query.skip,query.take);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getOne(@Param('id') id:number){
        return await this.service.getOne(id);
    }
    
    
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createOne(@Body() dto:AgendamientosDto){
        return await this.service.createOne(dto);
    }
    
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async editOne(@Param('id') id:number,@Body() dto:AgendamientosDto){
        return await this.service.editOne(id,dto);
    }
    
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
        return await this.service.deleteOne(id); 
    }


    
}
