import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, Headers, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ServiciosDto } from './servicios.dto';
import { Servicios } from './servicios.entity';
import { ServiciosService } from './servicios.service';


@ApiTags('Servicios')
@Controller('servicios')
export class ServiciosController{


    constructor(private readonly service:ServiciosService,private authServ:AuthService){}


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
async createOne(@Headers() headers:any,@Body() dto:ServiciosDto){
    if(!(await this.authServ.isTokenAdmin(headers))){
        throw new UnauthorizedException('Necesitas ser administrador!');
    }
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
async editOne(@Headers() headers:any,@Param('id') id:number,@Body() dto:ServiciosDto){
    if(!(await this.authServ.isTokenAdmin(headers))){
        throw new UnauthorizedException('Necesitas ser administrador!');
    }
    return await this.service.editOne(id,dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
async deleteOne(@Headers() headers:any,@Param('id') id:number){
    if(!(await this.authServ.isTokenAdmin(headers))){
        throw new UnauthorizedException('Necesitas ser administrador!');
    }
    return await this.service.deleteOne(id); 
}

    
    
    }