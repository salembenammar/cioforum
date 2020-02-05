import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from '../../tasks/entities/task.entity';
import { UserStatus } from '../enums/user-status.enum';
import { Role } from '../enums/role.enum';
import { Exclude } from 'class-transformer';
import { File } from '../../commun/entities/file.entity';
import { Company } from './company.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  salt: string;

  @Column()
  status: UserStatus;

  @Column()
  role: Role;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  @OneToOne(type => File)
  @JoinColumn()
  photo: File;

  @OneToOne(type => Company)
  @JoinColumn()
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
