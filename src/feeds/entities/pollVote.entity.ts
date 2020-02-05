import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { PollChoice } from './pollChoice.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PollVote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => PollChoice, pollChoice => pollChoice.votes)
  pollChoice: PollChoice;

  @ManyToOne(type => Poll, poll => poll.pollVotes)
  poll: Poll;

  @ManyToOne(type => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
