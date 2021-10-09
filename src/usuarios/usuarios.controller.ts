import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric.controller';
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



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post('change_password')
async changePassword(@Body() dto:ChangeUserPassDto) {
    return await this.service.changePassword(dto);
}



}
