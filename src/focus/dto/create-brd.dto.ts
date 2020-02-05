import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BrdType } from '../enums/brd-type.enum';

export class CreateBrdDto {
  @ApiModelProperty()
  @IsNotEmpty()
  content: string;

  @ApiModelProperty({ enum: BrdType })
  @IsNotEmpty()
  type: BrdType;

  @ApiModelProperty()
  @IsNotEmpty()
  focus: number;
}
