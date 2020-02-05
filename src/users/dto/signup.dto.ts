import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class SignupDto {
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

  @ApiModelProperty()
  fullName: string;

  @ApiModelProperty()
  displayName: string;

  @ApiModelProperty({ enum: Role })
  role: Role;
}
