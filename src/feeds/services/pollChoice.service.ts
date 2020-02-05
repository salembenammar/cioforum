import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollChoiceRepository } from '../repositories/pollChoice.repository';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { PollChoice } from '../entities/pollChoice.entity';
import { ErrorHandlerService } from '../../commun/services/error-handler.service';
import { User } from '../../users/entities/user.entity';
import * as config from 'config';
import {CreatePollDto} from '../dto/create-poll.dto';
import {Poll} from '../entities/poll.entity';
import {Focus} from '../../focus/entities/focus.entity';
import {Brd} from '../../focus/entities/brd.entity';
import {BrdType} from '../../focus/enums/brd-type.enum';

@Injectable()
export class PollChoiceService {
  constructor(
    @InjectRepository(PollChoiceRepository) private pollChoiceRepository: PollChoiceRepository,
  ) {}

    createPollchoices(choices: string[], poll: Poll): Array<Promise<PollChoice>> {
        return choices.map(choice => {
            const pollChoice = new PollChoice();
            // To-Do: complete save brds
            pollChoice.choice = choice;
            pollChoice.poll = poll;
            return pollChoice.save();
        });
    }
}
