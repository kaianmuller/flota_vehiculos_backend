import { Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric.controller';
import { EntitySchema } from 'typeorm';
import { AutosDto } from './autos.dto';
import { Autos } from './autos.entity';
import { AutosService } from './autos.service';


@ApiTags('Autos')
@Controller('autos')
export class AutosController extends ControllerGeneric<Autos,AutosDto>{

    constructor(private readonly autService:AutosService){
     super(autService);
    }
    

    
    
    
    }
