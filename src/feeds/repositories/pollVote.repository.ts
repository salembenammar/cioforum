import { EntityRepository, Repository } from 'typeorm';
import { PollVote } from '../entities/pollVote.entity';

@EntityRepository(PollVote)
export class PollVoteRepository extends Repository<PollVote> {}
