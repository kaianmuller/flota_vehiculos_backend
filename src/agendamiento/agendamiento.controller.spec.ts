import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientoController } from './agendamiento.controller';

describe('AgendamientoController', () => {
  let controller: AgendamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamientoController],
    }).compile();

    controller = module.get<AgendamientoController>(AgendamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
