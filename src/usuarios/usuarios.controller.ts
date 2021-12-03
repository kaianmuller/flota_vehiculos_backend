import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Headers, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ChangeUserPassDto } from './change-user-pass.dto';
import { UsuariosDto } from './usuarios.dto';
import { UsuariosService } from './usuarios.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController{

    constructor(private service:UsuariosService,private authServ:AuthService){}




@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post('change_password')
async changePassword(@Body() dto:ChangeUserPassDto) {
    return await this.service.changePassword(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get('existUserByLogin/:login')
async existUserByLogin(@Param('login') login:string) {
    return await this.service.getUsuarioByLogin(login);
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
async createOne(@Headers() headers:any,@Body() dto:UsuariosDto){
    if(!(await this.authServ.isTokenAdmin(headers))){
        throw new UnauthorizedException('Necesitas ser administrador!');
    }
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
async editOne(@Headers() headers:any,@Param('id') id:number,@Body() dto:UsuariosDto){
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
