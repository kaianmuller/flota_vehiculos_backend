import { Controller } from '@nestjs/common';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric.controller';
import { TiposServicioDto } from './tipos-servicio.dto';
import { TiposServicio } from './tipos-servicio.entity';
import { TiposServicioService } from './tipos-servicio.service';

@Controller('tipos-servicio')
export class TiposServicioController extends ControllerGeneric<TiposServicio,TiposServicioDto>{

constructor(readonly tsServ:TiposServicioService){
super(tsServ);
}
}
