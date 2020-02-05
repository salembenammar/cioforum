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
import { PollVote } from './pollVote.entity';
import { User } from '../../users/entities/user.entity';
import { Like } from '../../focus/entities/like.entity';

@Entity()
export class PollChoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  choice: string;

  @ManyToOne(type => Poll, poll => poll.pollChoices)
  poll: Poll;

  @OneToMany(type => PollVote, pollVote => pollVote.pollChoice)
  votes: PollVote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
