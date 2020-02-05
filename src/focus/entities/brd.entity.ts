import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BrdType } from '../enums/brd-type.enum';
import { Focus } from './focus.entity';
@Entity()
export class Brd extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  type: BrdType;

  @ManyToOne(type => Focus, focus => focus.brds)
  focus: Focus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
