import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollVoteRepository } from '../repositories/pollVote.repository';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { PollChoice } from '../entities/pollChoice.entity';
import { ErrorHandlerService } from '../../commun/services/error-handler.service';
import { User } from '../../users/entities/user.entity';
import * as config from 'config';

@Injectable()
export class PollVoteService {
  constructor(
    @InjectRepository(PollVoteRepository) private pollVoteRepository: PollVoteRepository,
  ) {}
}
