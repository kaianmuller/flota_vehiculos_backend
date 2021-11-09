import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/controller-generic.controller';
import { ServiciosDto } from './servicios.dto';
import { Servicios } from './servicios.entity';
import { ServiciosService } from './servicios.service';


@ApiTags('Servicios')
@Controller('servicios')
export class ServiciosController extends ControllerGeneric<Servicios,ServiciosDto>{


    constructor(private readonly servService:ServiciosService){
        super(servService);
    }
    
    

    
    
    }