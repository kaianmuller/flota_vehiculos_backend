import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric';
import { UsuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController extends ControllerGeneric<Usuario,UsuarioDto> {

constructor(private readonly usuarioService:UsuarioService){
    super(usuarioService);
}



}
