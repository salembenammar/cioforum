import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateCommentDto {
  @ApiModelPropertyOptional({ type: Number })
  @ValidateIf(c => !c.originalComment)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  focus: number;

  @ApiModelPropertyOptional({ type: Number })
  @ValidateIf(c => !c.focus)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  originalComment: number;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  @MinLength(2)
  content: string;
}
