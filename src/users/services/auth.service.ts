import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { SigninDto } from '../dto/signin.dto';
import { JwtPayload } from '../jwt-payload.interface';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<void> {
    return this.userRepository.signUp(signupDto);
  }

  async signIn(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(signinDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.signAsync(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
