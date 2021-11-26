import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ServiciosDto } from './servicios.dto';
import { Servicios } from './servicios.entity';
import { ServiciosService } from './servicios.service';


@ApiTags('Servicios')
@Controller('servicios')
export class ServiciosController{


    constructor(private readonly service:ServiciosService){}
    

    @Get('test')
    async getTest(@Query() query:any){
        return await this.service.getTest();
    }


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get('count')
async getCount(@Query() query:any){
    return await this.service.getCount(query);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get()
async getAll(@Query() query:any){
    return await this.service.getAll(query);
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
async createOne(@Body() dto:ServiciosDto){
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:ServiciosDto){
    return await this.service.editOne(id,dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.service.deleteOne(id); 
}

    
    
    }