import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from '../enums/country.enum';
import { File } from '../../commun/entities/file.entity';

@Entity()
@Unique(['name'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: Country;

  @OneToOne(type => File)
  @JoinColumn()
  logo: File;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
