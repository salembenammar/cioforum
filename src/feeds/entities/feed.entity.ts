import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn, ManyToOne,
} from 'typeorm';
import { FeedType } from '../enums/feed-type.enum';
import { File } from '../../commun/entities/file.entity';
import { Like } from '../../focus/entities/like.entity';
import { Comment } from '../../focus/entities/comment.entity';
import { User } from '../../users/entities/user.entity';
import { Poll } from './poll.entity';

@Entity()
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  type: FeedType;

  @OneToMany(type => File, file => file.feed, { eager: true })
  files: File[];

  @OneToMany(type => Like, like => like.feed, { eager: true })
  likes: Like[];

  @OneToMany(type => Comment, comment => comment.feed)
  comments: Comment[];

  @OneToOne(type => Poll, { eager: true })
  @JoinColumn()
  poll: Poll;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn()
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
