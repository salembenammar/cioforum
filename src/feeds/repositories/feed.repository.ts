import { EntityRepository, Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';

@EntityRepository(Feed)
export class FeedRepository extends Repository<Feed> {}
