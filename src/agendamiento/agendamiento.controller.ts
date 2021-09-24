import { Controller } from '@nestjs/common';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric';
import { AgendamientoDto } from './agendamiento.dto';
import { Agendamiento } from './agendamiento.entity';
import { AgendamientoService } from './agendamiento.service';

@Controller('agendamiento')
export class AgendamientoController extends ControllerGeneric<Agendamiento,AgendamientoDto>{


    constructor(private readonly agendServ:AgendamientoService){
        super(agendServ);
    }

}
