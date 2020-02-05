import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './entities/feed.entity';
import { FeedService } from './services/feed.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { TaskStatus } from '../tasks/enums/task-status.enum';
import { Task } from '../tasks/entities/task.entity';
import { TaskStatusValidationPipe } from '../tasks/pipes/task-status-validation.pipe';
import {FindCommentsFilterDto} from '../focus/dto/find-comments-filter.dto';
import {FindFeedsFilterDto} from './dto/find-feeds-filter.dto';
import {Focus} from '../focus/entities/focus.entity';

@Controller('feeds')
@UseGuards(AuthGuard())
export class FeedController {
  constructor(private feedService: FeedService) {}

  @ApiBearerAuth()
  @Get()
  async findFeeds(
      @Query(ValidationPipe) findFeedsFilterDto: FindFeedsFilterDto,
  ): Promise<Feed[]> {
    return this.feedService.findFeeds(findFeedsFilterDto);
  }

  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get('/:id')
  async getFocus(@Param('id', ParseIntPipe) id: number): Promise<Feed> {
      return this.feedService.getFeed(id);
  }

  @ApiBearerAuth()
  @Post()
  @UsePipes(ValidationPipe)
  createFeed(
    @Body() createFeedDto: CreateFeedDto,
    @GetUser() user: User,
  ): Promise<Feed> {
    return this.feedService.createFeed(createFeedDto, user);
  }

  // @ApiBearerAuth()
  // @Delete('/:id')
  // deleteTask(
  //     @Param('id', ParseIntPipe) id: number,
  //     @GetUser() user: User,
  // ): Promise<void> {
  //     return this.tasksService.deleteTask(id, user);
  // }
  //
  // @ApiBearerAuth()
  // @Patch('/:id/status')
  // updateTaskStatus(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  //     @GetUser() user: User,
  // ): Promise<Task> {
  //     return this.tasksService.updateTaskStatus(id, status, user);
  // }
}
