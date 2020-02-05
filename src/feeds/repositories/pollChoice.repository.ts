import { EntityRepository, Repository } from 'typeorm';
import { PollChoice } from '../entities/pollChoice.entity';

@EntityRepository(PollChoice)
export class PollChoiceRepository extends Repository<PollChoice> {}
