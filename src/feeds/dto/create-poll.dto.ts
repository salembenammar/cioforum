import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {IsArray, IsDate, IsNotEmpty, IsString, MinDate, MinLength} from 'class-validator';

export class CreatePollDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinDate(new Date())
  @IsDate()
  expiryDate: Date;

  @ApiModelProperty({ type: [String] })
  @MinLength(2)
  @IsNotEmpty()
  @IsArray()
  choices: string[];
}
