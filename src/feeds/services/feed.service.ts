import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedRepository } from '../repositories/feed.repository';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { Feed } from '../entities/feed.entity';
import { User } from '../../users/entities/user.entity';
import { FeedType } from '../enums/feed-type.enum';
import * as config from 'config';
import { FindFeedsFilterDto } from '../dto/find-feeds-filter.dto';
import { PollService } from '../services/poll.service';
import { PollChoiceService } from '../services/pollChoice.service';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedRepository) private feedRepository: FeedRepository,
    private pollService: PollService,
  ) {}

  async createFeed(createFeedDto: CreateFeedDto, user: User): Promise<Feed> {
    const feed = new Feed();
    feed.createdBy = user;
    if ([FeedType.LINK, FeedType.TXT].includes(createFeedDto.type)) {
        if (createFeedDto.poll) { delete createFeedDto.poll; }
        if (createFeedDto.files) { delete createFeedDto.files; }
    }
    if ([FeedType.IMG].includes(createFeedDto.type)) {
        delete createFeedDto.poll;
    }
    if ([FeedType.POLL].includes(createFeedDto.type)) {
        delete createFeedDto.files;
        feed.poll = await this.pollService.createPoll(createFeedDto.poll);
    }
    feed.type = createFeedDto.type;
    feed.description = createFeedDto.description;
    try {
        await feed.save();
    } catch (error) {
        throw new InternalServerErrorException();
    }
    return this.getFeed(feed.id);
  }

  async findFeeds(
      findFeedsFilterDto: FindFeedsFilterDto,
  ): Promise<Feed[]> {
    // return this.feedRepository.find();
      const query = this.feedRepository.createQueryBuilder('feeds');
      query.leftJoinAndSelect('feeds.createdBy', 'createdBy');
      query.leftJoinAndSelect('feeds.poll', 'poll');
      query.leftJoinAndSelect('poll.pollChoices', 'pollChoices');
      query.leftJoinAndSelect('feeds.files', 'files');
      query.leftJoinAndSelect('feeds.likes', 'likes');
      query.addOrderBy(
          'feeds.createdAt',
          findFeedsFilterDto.order || 'DESC',
      );
      query.offset(
          (findFeedsFilterDto.page || 0) *
          (findFeedsFilterDto.pageSize || config.get('pagination').pageSize),
      );
      query.limit(
          findFeedsFilterDto.pageSize || config.get('pagination').pageSize,
      );
      return query.getMany();
  }

  async getFeed(id: number): Promise<Feed> {
    return this.feedRepository.findOne({ id });
  }
}
