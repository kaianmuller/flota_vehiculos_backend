import { Test, TestingModule } from '@nestjs/testing';
import { TiposServicioController } from './tipos-servicio.controller';

describe('TiposServicioController', () => {
  let controller: TiposServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposServicioController],
    }).compile();

    controller = module.get<TiposServicioController>(TiposServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
