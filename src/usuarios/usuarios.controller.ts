import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric.controller';
import { UsuariosDto } from './usuarios.dto';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';


@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController extends ControllerGeneric<Usuarios,UsuariosDto>{

    constructor(private usServ:UsuariosService){
        super(usServ);
    }




}
