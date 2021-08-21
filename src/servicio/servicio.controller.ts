import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ServicioDto } from './servicio.dto';
import { ServicioService } from './servicio.service';

@Controller('servicio')
export class ServicioController {


constructor(private readonly servicioService:ServicioService){}


@Get()
async getAll() {
    return await this.servicioService.getAll();
}


@Get(':id')
async getOne(@Param('id') id:number){
    return await this.servicioService.getOne(id);
}


@Post()
@ApiBody({type: ServicioDto})
async createOne(@Body() dto:ServicioDto){
    return await this.servicioService.createOne(dto);
}

@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:ServicioDto){
    return await this.servicioService.editOne(id,dto);
}


@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.servicioService.deleteOne(id); 
}

}
