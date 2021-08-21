import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AutoDto } from './auto.dto';
import { AutoService } from './auto.service';

@Controller('auto')
export class AutoController {

constructor(private readonly autoService:AutoService){}

@Get()
async getAll() {
    return await this.autoService.getAll();
}


@Get(':id')
async getOne(@Param('id') id:number){
    return await this.autoService.getOne(id);
}


@Post()
@ApiBody({type: AutoDto})
async createOne(@Body() dto:AutoDto){
    return await this.autoService.createOne(dto);
}

@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:AutoDto){
    return await this.autoService.editOne(id,dto);
}


@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.autoService.deleteOne(id); 
}




}