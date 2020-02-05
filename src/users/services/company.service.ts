import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../repositories/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Company } from '../entities/company.entity';
import { User } from '../entities/user.entity';
import { ErrorHandlerService } from '../../commun/services/error-handler.service';

@Injectable()
export class CompanyService {
  private logger = new Logger('CompanyService');
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();
    const { name, country } = createCompanyDto;
    company.name = name;
    company.country = country;
    try {
      await company.save();
    } catch (e) {
      /*throw new InternalServerErrorException();*/
      ErrorHandlerService.handleError(e);
      // console.error(e);
      this.logger.error(
        `Failed to create a company". Data: ${createCompanyDto}`,
        e.stack,
      );
    }
    return company;
  }
}
