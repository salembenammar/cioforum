import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as config from 'config';
import { FileService } from './services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './repositories/file.repository';
@Module({
  imports: [
    MulterModule.register({
      dest:
        process.env.NODE_ENV === 'development'
          ? __dirname + config.get('uploads').path
          : config.get('uploads').path,
    }),
    TypeOrmModule.forFeature([FileRepository]),
  ],
  controllers: [CommonController],
  providers: [FileService],
})
export class CommunModule {}
