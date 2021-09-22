import { Body, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody} from "@nestjs/swagger";
import { Repository } from "typeorm";




export class ControllerGeneric<E,EDto>{

constructor(readonly service:any){
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get()
async getAll() {
    return await this.service.getAll();
}

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get(':id')
async getOne(@Param('id') id:number){
    return await this.service.getOne(id);
}


@Post()
async createOne(@Body() dto:EDto){
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:EDto){
    return await this.service.editOne(id,dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.service.deleteOne(id); 
}
}