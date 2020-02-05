import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { Focus } from '../entities/focus.entity';
import { CreateLikeDto } from '../dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from '../repositories/like.repository';
import { Like } from '../entities/like.entity';
import { FocusService } from './focus.service';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeRepository) private likeRepository: LikeRepository,
    private focusService: FocusService,
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async createLike(createLikeDto: CreateLikeDto, user: User): Promise<any> {
    const like = new Like();
    like.sens = createLikeDto.sens;

    like.createdBy = user;
    /**
     * if like is on a focus
     */
    if (createLikeDto.focus) {
      const focus: Focus = await this.focusService.getFocus(
        createLikeDto.focus,
      );
      if (!focus) {
        throw new NotFoundException(
          'Unable to find focus ' + createLikeDto.focus,
        );
      }
      like.focus = focus;
    }
    /**
     * if like is on a comment
     */
    if (createLikeDto.comment) {
      const comment: Comment = await this.commentRepository.findOne({
        id: createLikeDto.comment,
      });
      if (!comment) {
        throw new NotFoundException(
          'Unable to find comment ' + createLikeDto.comment,
        );
      }
      like.comment = comment;
    }

    return like.save();
  }
}
