import { Country } from '../enums/country.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCompanyDto {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({ enum: Country })
  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;
}
