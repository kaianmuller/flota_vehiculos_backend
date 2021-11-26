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

  async getTest() {
    return await this.repository.find({
      join: {
        alias: 's',
        leftJoinAndSelect: {
          auto: 's.auto',
          usuario: 's.usuario',
          tipo_servicio: 's.tipo_servicio',
        },
      },
      where: [
        { auto: { chapa: 'A3', disponibilidad: 'DISPONIBLE' } },
        { auto: { modelo: 'A3', disponibilidad: 'DISPONIBLE' } },
      ],
    });
  }
}
