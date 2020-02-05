import { Test, TestingModule } from '@nestjs/testing';
import { BrdService } from './brd.service';

describe('BrdService', () => {
  let service: BrdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrdService],
    }).compile();

    service = module.get<BrdService>(BrdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
