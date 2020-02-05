import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateFocusDto } from './dto/create-focus.dto';
import { Focus } from './entities/focus.entity';
import { FocusService } from './services/focus.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { FindFocusFilterDto } from './dto/find-focus-filter.dto';

@Controller('focus')
@UseGuards(AuthGuard())
export class FocusController {
  constructor(private focusService: FocusService) {}
  @ApiBearerAuth()
  @Post()
  @UsePipes(ValidationPipe)
  async createFocus(
    @Body(ValidationPipe) createFocusDto: CreateFocusDto,
    @GetUser() user: User,
  ): Promise<Focus> {
    return this.focusService.createFocus(createFocusDto, user);
  }

  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get()
  async findFocus(
    @Query(ValidationPipe) findFocusFilterDto: FindFocusFilterDto,
  ): Promise<Focus[]> {
    return this.focusService.findFocus(findFocusFilterDto);
  }

  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get('/:id')
  async getFocus(@Param('id', ParseIntPipe) id: number): Promise<Focus> {
    return this.focusService.getFocus(id);
  }
}
