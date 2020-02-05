import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FocusService } from './services/focus.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { FindCommentsFilterDto } from './dto/find-comments-filter.dto';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(
    private focusService: FocusService,
    private commentService: CommentService,
  ) {}

  @ApiBearerAuth()
  @Post()
  @UsePipes(ValidationPipe)
  /*@ApiImplicitBody({description: 'create comment', name: 'create comment', type: 'POST', required: true})*/
  async createComment(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.commentService.createComment(createCommentDto, user);
  }

  @ApiBearerAuth()
  @Get()
  @UsePipes(ValidationPipe)
  async findComments(
    @Query(ValidationPipe) findCommentsFilterDto: FindCommentsFilterDto,
  ): Promise<Comment[]> {
    return this.commentService.findComments(findCommentsFilterDto);
  }
}
