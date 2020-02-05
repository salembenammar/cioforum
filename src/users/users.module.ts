import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './services/users.service';
import { CompanyRepository } from './repositories/company.repository';
import { CompaniesController } from './companies.controller';
import * as config from 'config';
import { CompanyService } from './services/company.service';
import { CommunModule } from '../commun/commun.module';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, CompanyRepository]),
    CommunModule,
  ],
  controllers: [AuthController, CompaniesController],
  providers: [AuthService, JwtStrategy, UsersService, CompanyService],
  exports: [JwtStrategy, PassportModule, UsersService, CompanyService],
})
export class UsersModule {}
