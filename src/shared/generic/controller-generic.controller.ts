import { Body, Delete, Get, Param, Post, Put, Query, Req, Type, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody} from "@nestjs/swagger";




export class ControllerGeneric<E,EDto>{



constructor(readonly service:any){

}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe())
@Get('count')
async getCount(){
    return await this.service.getCount();
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get()
@UsePipes(new ValidationPipe())
async getAll(@Query() query:any){
    return await this.service.getAll(query.skip,query.take);
}

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get(':id')
@UsePipes(new ValidationPipe())
async getOne(@Param('id') id:number){
    return await this.service.getOne(id);
}



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post()
@UsePipes(new ValidationPipe())
async createOne(@Body() dto:EDto){
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
@UsePipes(new ValidationPipe())
async editOne(@Param('id') id:number,@Body() dto:EDto){
    return await this.service.editOne(id,dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
@UsePipes(new ValidationPipe())
async deleteOne(@Param('id') id:number){
    return await this.service.deleteOne(id); 
}



}
