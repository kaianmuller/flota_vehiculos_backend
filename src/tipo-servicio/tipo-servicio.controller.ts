import { Controller } from '@nestjs/common';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric';
import { TipoServicioDto } from './tipo-servicio.dto';
import { TipoServicio } from './tipo-servicio.entity';
import { TipoServicioService } from './tipo-servicio.service';

@Controller('tipo-servicio')
export class TipoServicioController extends ControllerGeneric<TipoServicio,TipoServicioDto>{

    constructor(private readonly tsServ:TipoServicioService){
        super(tsServ);
    }
}
