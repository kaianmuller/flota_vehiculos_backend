import { Controller } from '@nestjs/common';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric';
import { MovimientoDto } from './movimiento.dto';
import { Movimiento } from './movimiento.entity';
import { MovimientoService } from './movimiento.service';

@Controller('movimiento')
export class MovimientoController extends ControllerGeneric<Movimiento,MovimientoDto>{

constructor(private readonly movServ:MovimientoService){
    super(movServ);
}


}
