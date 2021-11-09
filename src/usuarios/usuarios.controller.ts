import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/controller-generic.controller';
import { ChangeUserPassDto } from './change-user-pass.dto';
import { UsuariosDto } from './usuarios.dto';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';


@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController extends ControllerGeneric<Usuarios,UsuariosDto>{

    constructor(private usServ:UsuariosService){
        super(usServ);
    }



@Post()
@UsePipes(new ValidationPipe())
async createOne(@Body() dto:UsuariosDto){
        return await this.usServ.createOne(dto);
}

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post('change_password')
@UsePipes(new ValidationPipe())
async changePassword(@Body() dto:ChangeUserPassDto) {
    return await this.usServ.changePassword(dto);
}



@Get('existUserByLogin/:login')
@UsePipes(new ValidationPipe())
async existUserByLogin(@Param('login') login:string) {

    if(await this.usServ.getUsuarioByLogin(login)){
       return true; 
    }

    return false;
}



}
