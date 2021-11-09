import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/controller-generic.controller';
import { AgendamientosDto } from './agendamientos.dto';
import { Agendamientos } from './agendamientos.entity';
import { AgendamientosService } from './agendamientos.service';

@ApiTags('Agendamientos')
@Controller('agendamientos')
export class AgendamientosController extends ControllerGeneric<Agendamientos,AgendamientosDto>{


    constructor(private readonly agendServ:AgendamientosService){
        super(agendServ);
    }




    
}
