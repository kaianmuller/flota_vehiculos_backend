import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ControllerGeneric } from 'src/shared/generic/ControllerGeneric.controller';
import { MovimientosDto } from './movimientos.dto';
import { Movimientos } from './movimientos.entity';
import { MovimientosService } from './movimientos.service';


@ApiTags('Movimientos')
@Controller('movimientos')
export class MovimientosController extends ControllerGeneric<Movimientos,MovimientosDto>{

    constructor(private readonly movServ:MovimientosService){
        super(movServ);
    }




}