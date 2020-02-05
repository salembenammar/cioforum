import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FocusRepository } from './repositories/focus.repository';
import { FocusController } from './focus.controller';
import { FocusService } from './services/focus.service';
import { BrdRepository } from './repositories/brd.repository';
import { CommentRepository } from './repositories/comment.repository';
import { BrdService } from './services/brd.service';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';
import { LikeRepository } from './repositories/like.repository';
import { CommentController } from './comment.controller';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { LikesController } from './likes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FocusRepository,
      BrdRepository,
      CommentRepository,
      LikeRepository,
    ]),
    UsersModule,
  ],
  controllers: [FocusController, CommentController, LikesController],
  providers: [FocusService, BrdService, CommentService, LikeService],
})
export class FocusModule {}
