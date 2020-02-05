import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { CompanyService } from './services/company.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
@UseGuards(AuthGuard())
export class CompaniesController {
  private logger = new Logger('CompaniesController');
  constructor(private companyService: CompanyService) {}
  @ApiBearerAuth()
  @Post()
  async createCompany(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }
}
