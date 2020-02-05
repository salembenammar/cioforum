import { EntityRepository, Repository } from 'typeorm';
import { Focus } from '../entities/focus.entity';

@EntityRepository(Focus)
export class FocusRepository extends Repository<Focus> {}
