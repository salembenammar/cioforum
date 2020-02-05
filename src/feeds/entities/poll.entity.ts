import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FeedType } from '../enums/feed-type.enum';
import { File } from '../../commun/entities/file.entity';
import { PollChoice } from './pollChoice.entity';
import { PollVote } from './pollVote.entity';
import { Like } from '../../focus/entities/like.entity';
import { Comment } from '../../focus/entities/comment.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @CreateDateColumn()
  expiryDate: Date;

  @OneToMany(type => PollChoice, pollChoice => pollChoice.poll, { eager: true })
  pollChoices: PollChoice[];

  @OneToMany(type => PollVote, pollVote => pollVote.poll)
  pollVotes: PollVote[];

  @OneToMany(type => Comment, comment => comment.feed)
  pollComments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
