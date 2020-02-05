import { Repository, EntityRepository } from 'typeorm';
import { Brd } from '../entities/brd.entity';

@EntityRepository(Brd)
export class BrdRepository extends Repository<Brd> {}
