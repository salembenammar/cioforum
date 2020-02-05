import { ApiModelProperty } from '@nestjs/swagger';
import { FocusType } from '../enums/focus-type.enum';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateFocusDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(FocusType)
  type: FocusType;

  @ApiModelProperty()
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  description: string;

  @ApiModelProperty({ type: [Number] })
  @IsNotEmpty()
  files: number[];

  @ApiModelProperty({ type: [String] })
  @IsNotEmpty()
  benefits: string[];

  @ApiModelProperty({ type: [String] })
  @IsNotEmpty()
  risks: string[];

  @ApiModelProperty({ type: [String] })
  @IsNotEmpty()
  dependencies: string[];
}
