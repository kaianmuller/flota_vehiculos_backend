import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric.controller';
import { TiposServicioDto } from './tipos-servicio.dto';
import { TiposServicio } from './tipos-servicio.entity';
import { TiposServicioService } from './tipos-servicio.service';


@ApiTags('Tipos servicio')
@Controller('tipos-servicio')
export class TiposServicioController extends ControllerGeneric<TiposServicio,TiposServicioDto>{

    constructor(private readonly tsServ:TiposServicioService){
        super(tsServ);
    }




    
}
