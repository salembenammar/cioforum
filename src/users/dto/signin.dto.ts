import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
