import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollRepository } from '../repositories/poll.repository';
import { CreatePollDto } from '../dto/create-poll.dto';
import { Poll } from '../entities/poll.entity';
import { ErrorHandlerService } from '../../commun/services/error-handler.service';
import { User } from '../../users/entities/user.entity';
import * as config from 'config';
import { FindFeedsFilterDto } from '../dto/find-feeds-filter.dto';
import {Feed} from '../entities/feed.entity';
import {FeedType} from '../enums/feed-type.enum';
import { PollChoiceService } from './pollChoice.service';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollRepository) private pollRepository: PollRepository,
    private pollChoiceService: PollChoiceService,
  ) {}

    async createPoll(createPollDto: CreatePollDto): Promise<Poll> {
        const poll = new Poll();
        Object.assign(poll, createPollDto);
        try {
            await poll.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
        // crete choices of the poll
        this.pollChoiceService.createPollchoices(createPollDto.choices, poll);
        return this.getPoll(poll.id);
    }

    async getPoll(id: number): Promise<Poll> {
        return this.pollRepository.findOne({ id });
    }
}
