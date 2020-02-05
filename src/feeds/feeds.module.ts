import { Module } from '@nestjs/common';
import { FeedController } from '../feeds/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedService } from '../feeds/services/feed.service';
import { PollService } from '../feeds/services/poll.service';
import { PollChoiceService } from '../feeds/services/pollChoice.service';
import { PollVoteService } from '../feeds/services/pollVote.service';
import { FeedRepository } from '../feeds/repositories/feed.repository';
import { PollRepository } from '../feeds/repositories/poll.repository';
import { PollChoiceRepository } from '../feeds/repositories/pollChoice.repository';
import { PollVoteRepository } from '../feeds/repositories/pollVote.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeedRepository, PollRepository, PollChoiceRepository, PollVoteRepository]), UsersModule],
  controllers: [FeedController],
  providers: [FeedService, PollService, PollChoiceService, PollVoteService],
})
export class FeedsModule {}
