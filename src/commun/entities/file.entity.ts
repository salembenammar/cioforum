import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Focus } from '../../focus/entities/focus.entity';
import { Feed } from '../../feeds/entities/feed.entity';

@Entity()
@Unique(['name', 'path'])
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  originalFileName: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Focus, focus => focus.files)
  focus: Focus;

  @ManyToOne(type => Feed, feed => feed.files)
  feed: Feed;
}
