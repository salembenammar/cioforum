import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { User } from '../../users/entities/user.entity';
import { Focus } from './focus.entity';
import { Feed } from '../../feeds/entities/feed.entity';
@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToMany(type => Comment, comment => comment.originalComment)
  replies: Comment[];

  @ManyToOne(type => Comment, comment => comment.replies, { eager: false })
  originalComment: Comment;

  @ManyToOne(type => Focus, focus => focus.comments)
  focus: Focus;

  @ManyToOne(type => Feed, feed => feed.comments)
  feed: Feed;

  @OneToMany(type => Like, like => like.comment)
  likes: Like[];

  @OneToOne(type => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
