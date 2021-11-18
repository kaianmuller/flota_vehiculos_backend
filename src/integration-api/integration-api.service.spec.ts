import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationApiService } from './integration-api.service';

describe('IntegrationApiService', () => {
  let service: IntegrationApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegrationApiService],
    }).compile();

    service = module.get<IntegrationApiService>(IntegrationApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
