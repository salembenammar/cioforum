import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Focus } from '../entities/focus.entity';
import { Comment } from '../entities/comment.entity';
import { FocusService } from './focus.service';
import { User } from '../../users/entities/user.entity';
import { FindCommentsFilterDto } from '../dto/find-comments-filter.dto';
import * as config from 'config';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    private focusService: FocusService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<any> {
    const comment = new Comment();
    comment.content = createCommentDto.content;

    comment.createdBy = user;
    /**
     * if comment belongs to a focus
     */
    if (createCommentDto.focus) {
      const focus: Focus = await this.focusService.getFocus(
        createCommentDto.focus,
      );
      if (!focus) {
        throw new NotFoundException(
          'Unable to find focus ' + createCommentDto.focus,
        );
      }
      comment.focus = focus;
    }
    /**
     * if comment is a reply to another comment
     */
    if (createCommentDto.originalComment) {
      const originalComment: Comment = await this.commentRepository.findOne({
        id: createCommentDto.originalComment,
      });
      if (!originalComment) {
        throw new NotFoundException(
          'Unable to find comment ' + createCommentDto.originalComment,
        );
      }
      comment.originalComment = originalComment;
    }

    return comment.save();
  }

  async findComments(
    findCommentsFilterDto: FindCommentsFilterDto,
  ): Promise<Comment[]> {
    const query = this.commentRepository.createQueryBuilder('comment');
    query.leftJoinAndSelect('comment.replies', 'replies');
    query.leftJoinAndSelect('comment.likes', 'likes');
    if (findCommentsFilterDto.focus) {
      query.where('comment.focusId = :focusId', {
        focusId: findCommentsFilterDto.focus,
      });
    } else {
      query.where('comment.originalCommentId = :comment', {
        comment: findCommentsFilterDto.originalComment,
      });
    }
    query.addOrderBy(
      'comment.createdAt',
      findCommentsFilterDto.order || 'DESC',
    );
    query.offset(
      (findCommentsFilterDto.page || 0) *
        (findCommentsFilterDto.pageSize || config.get('pagination').pageSize),
    );
    query.limit(
      findCommentsFilterDto.pageSize || config.get('pagination').pageSize,
    );
    return query.getMany();
  }
}
