import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, ValidateIf } from 'class-validator';

export class CreateLikeDto {
  @ApiModelPropertyOptional({ type: Number, default: 1 })
  @ValidateIf(c => !c.originalComment)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  focus: number;

  @ApiModelPropertyOptional({ type: Number, default: 1 })
  @ValidateIf(c => !c.focus)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  comment: number;

  @ApiModelProperty({ type: Boolean, default: true })
  @IsNotEmpty()
  sens: boolean;
}
