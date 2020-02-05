import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { FocusType } from '../enums/focus-type.enum';
import { File } from '../../commun/entities/file.entity';
import { Brd } from './brd.entity';
import { Like } from './like.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Focus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: FocusType;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => File, file => file.focus)
  files: File[];

  @OneToMany(type => Brd, brd => brd.focus, {
    eager: true,
  })
  brds: Brd[];

  /* @OneToMany(type => Brd, brd => brd.focus, {
    eager: true,
  })
  benefits: Brd[];

  @OneToMany(type => Brd, brd => brd.focus, {
    eager: true,
  })
  risks: Brd[];

  @OneToMany(type => Brd, brd => brd.focus, {
    eager: true,
  })
  dependencies: Brd[]; */

  @OneToMany(type => Like, like => like.focus)
  likes: Like[];

  @OneToMany(type => Comment, comment => comment.focus)
  comments: Comment[];

  @OneToOne(type => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
