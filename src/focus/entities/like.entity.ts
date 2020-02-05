import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Focus } from './focus.entity';
import { Feed } from '../../feeds/entities/feed.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sens: boolean;

  @ManyToOne(type => Comment, comment => comment.likes, { eager: false })
  comment: Comment;

  @ManyToOne(type => Focus, focus => focus.likes, { eager: false })
  focus: Focus;

  @ManyToOne(type => Feed, feed => feed.likes)
  feed: Feed;

  @OneToOne(type => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
