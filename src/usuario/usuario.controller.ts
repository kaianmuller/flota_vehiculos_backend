import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UsuarioDto } from './usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {


constructor(private readonly usuarioService :UsuarioService){}

@Get()
async getAll() {
    return await this.usuarioService.getAll();
}


@Get(':id')
async getOne(@Param('id') id:number){
    return await this.usuarioService.getOne(id);
}


@Post()
@ApiBody({type: UsuarioDto})
async createOne(@Body() dto:UsuarioDto){
    return await this.usuarioService.createOne(dto);
}

@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:UsuarioDto){
    return await this.usuarioService.editOne(id,dto);
}


@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.usuarioService.deleteOne(id); 
}

}
