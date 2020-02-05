import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './services/auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signupDto: SignupDto): Promise<void> {
    return this.authService.signUp(signupDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signinDto: SigninDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinDto);
  }
}
