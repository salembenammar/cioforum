import { Test, TestingModule } from '@nestjs/testing';
import { PollChoiceService } from './pollChoice.service';

describe('PollChoiceService', () => {
  let service: PollChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollChoiceService],
    }).compile();

    service = module.get<PollChoiceService>(PollChoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
