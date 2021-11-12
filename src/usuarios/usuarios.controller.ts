import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChangeUserPassDto } from './change-user-pass.dto';
import { UsuariosDto } from './usuarios.dto';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';


@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController{

    constructor(private service:UsuariosService){}



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post('change_password')
async changePassword(@Body() dto:ChangeUserPassDto) {
    return await this.service.changePassword(dto);
}



@Get('existUserByLogin/:login')
async existUserByLogin(@Param('login') login:string) {

    if(await this.service.getUsuarioByLogin(login)){
       return true; 
    }

    return false;
}


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
    return await this.service.getAll(query);
}

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get(':id')
async getOne(@Param('id') id:number){
    return await this.service.getOne(id);
}



@Post()
async createOne(@Body() dto:UsuariosDto){
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:UsuariosDto){
    return await this.service.editOne(id,dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.service.deleteOne(id); 
}




}
