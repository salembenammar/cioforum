import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { FeedType } from '../enums/feed-type.enum';
import { CreatePollDto } from './create-poll.dto';
import {IsNotEmpty, IsEnum, ValidateIf, IsArray, MinLength} from 'class-validator';

export class CreateFeedDto {
  @ApiModelProperty()
  @IsNotEmpty()
  description: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(FeedType)
  type: FeedType;

  @ApiModelPropertyOptional({ type: [Number] })
  @ValidateIf(c => c.type === FeedType.IMG)
  @IsNotEmpty()
  @IsArray()
  @MinLength(1)
  files: number[];

  @ApiModelPropertyOptional({ type: CreatePollDto })
  @ValidateIf(c => c.type === FeedType.POLL)
  @IsNotEmpty()
  poll: CreatePollDto;
}
