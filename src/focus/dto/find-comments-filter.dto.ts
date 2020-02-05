import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { SortOrder } from '../../commun/SortOrder';
import { Transform } from 'class-transformer';

export class FindCommentsFilterDto {
  @ApiModelPropertyOptional({ minimum: 1, type: Number, default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(page => parseInt(page, 10))
  page: number;

  @ApiModelPropertyOptional({ minimum: 1, type: Number, default: 10 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(page => parseInt(page, 10))
  pageSize: number;

  @ApiModelPropertyOptional({
    enum: [SortOrder.ASC, SortOrder.DESC],
    type: SortOrder,
    default: SortOrder.DESC,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  order: SortOrder;

  @ApiModelProperty({ required: true })
  @ValidateIf(c => !c.originalComment)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Transform(page => parseInt(page, 10))
  focus: number;

  @ApiModelProperty({ required: true })
  @ValidateIf(c => !c.focus)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Transform(page => parseInt(page, 10))
  originalComment: number;
}
