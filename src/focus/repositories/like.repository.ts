import { Repository, EntityRepository } from 'typeorm';
import { Like } from '../entities/like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {}
