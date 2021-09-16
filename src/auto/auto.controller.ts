import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric';
import { AutoDto } from './auto.dto';
import { Auto } from './auto.entity';
import { AutoService } from './auto.service';

@Controller('auto')
export class AutoController extends ControllerGeneric<Auto,AutoDto> {

constructor(private readonly autoService:AutoService){
    super(autoService);
}






}