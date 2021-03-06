import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneric } from 'src/shared/generic/service-generic.service';
import { Repository } from 'typeorm';
import { ServiciosDto } from './servicios.dto';
import { Servicios } from './servicios.entity';

@Injectable()
export class ServiciosService extends ServiceGeneric<Servicios, ServiciosDto> {
  constructor(
    @InjectRepository(Servicios)
    readonly repository: Repository<Servicios>,
  ) {
    super(repository);
  }

}
