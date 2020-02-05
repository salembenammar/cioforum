import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { UserStatus } from '../enums/user-status.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signupDto: SignupDto): Promise<void> {
    const { email, password, fullName, displayName, role } = signupDto;

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.fullName = fullName;
    user.displayName = displayName;
    user.status = UserStatus.PENDING;
    user.role = role;

    try {
      await user.save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(signinDto: SigninDto): Promise<string> {
    const { email, password } = signinDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
