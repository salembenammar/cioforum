import { PollRepository } from './poll.repository';

describe('PollRepository', () => {
  it('should be defined', () => {
    expect(new PollRepository()).toBeDefined();
  });
});
