import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeService } from './services/like.service';

@Controller('likes')
@UseGuards(AuthGuard())
export class LikesController {
  constructor(private likeService: LikeService) {}

  @ApiBearerAuth()
  @Post()
  @UsePipes(ValidationPipe)
  async createLike(
    @Body(ValidationPipe) createLikeDto: CreateLikeDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.likeService.createLike(createLikeDto, user);
  }
}
