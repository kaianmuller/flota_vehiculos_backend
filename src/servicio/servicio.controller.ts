import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric';
import { ServicioDto } from './servicio.dto';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';

@Controller('servicio')
export class ServicioController extends ControllerGeneric<Servicio,ServicioDto>{


constructor(private readonly servicioService:ServicioService){
    super(servicioService);
}




}
