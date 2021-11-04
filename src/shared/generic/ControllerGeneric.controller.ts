import { Body, Delete, Get, Param, Post, Put, Query, Req, Type, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody} from "@nestjs/swagger";




export class ControllerGeneric<E,EDto>{


constructor(readonly service:any){
   
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


