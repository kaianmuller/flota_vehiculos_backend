import { Test, TestingModule } from '@nestjs/testing';
import { TiposServicioService } from './tipos-servicio.service';

describe('TiposServicioService', () => {
  let service: TiposServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposServicioService],
    }).compile();

    service = module.get<TiposServicioService>(TiposServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
