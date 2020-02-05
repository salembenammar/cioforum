import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FocusRepository } from '../repositories/focus.repository';
import { CreateFocusDto } from '../dto/create-focus.dto';
import { Focus } from '../entities/focus.entity';
import { ErrorHandlerService } from '../../commun/services/error-handler.service';
import { BrdRepository } from '../repositories/brd.repository';
import { Brd } from '../entities/brd.entity';
import { BrdType } from '../enums/brd-type.enum';
import { User } from '../../users/entities/user.entity';
import { FindFocusFilterDto } from '../dto/find-focus-filter.dto';
import * as config from 'config';

@Injectable()
export class FocusService {
  constructor(
    @InjectRepository(FocusRepository) private focusRepository: FocusRepository,
    @InjectRepository(BrdRepository) private brdRepository: BrdRepository,
  ) {}

  async createFocus(
    createFocusDto: CreateFocusDto,
    user: User,
  ): Promise<Focus> {
    const benefits = createFocusDto.benefits;
    delete createFocusDto.benefits;
    const risks = createFocusDto.risks;
    delete createFocusDto.risks;
    const dependencies = createFocusDto.dependencies;
    delete createFocusDto.dependencies;
    const focus = new Focus();
    focus.createdBy = user;
    Object.assign(focus, createFocusDto);
    let brds = [];
    try {
      await focus.save();
      const benefitsPromises = this.saveBrds(benefits, BrdType.BENEFIT, focus);
      brds = await Promise.all(benefitsPromises);
      const risksPromises = this.saveBrds(risks, BrdType.RISK, focus);
      brds = brds.concat(await Promise.all(risksPromises));
      const dependenciesPromises = this.saveBrds(
        dependencies,
        BrdType.DEPENDENCY,
        focus,
      );
      brds = brds.concat(await Promise.all(dependenciesPromises));
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
    /* focus.setBrds(brds); */
    return this.getFocus(focus.id);
  }

  async findFocus(findFocusFilterDto: FindFocusFilterDto): Promise<Focus[]> {
    const query = this.focusRepository.createQueryBuilder('focus');
    query.leftJoinAndSelect('focus.brds', 'brds');
    query.addOrderBy('focus.createdAt', findFocusFilterDto.order || 'DESC');
    query.offset(
      (findFocusFilterDto.page || 0) *
        (findFocusFilterDto.pageSize || config.get('pagination').pageSize),
    );
    query.limit(
      findFocusFilterDto.pageSize || config.get('pagination').pageSize,
    );
    return query.getMany();
  }

  async getFocus(id: number): Promise<Focus> {
    return this.focusRepository.findOne({ id });
  }
  /**
   * saves all benefits/risks/dependencies of a focus
   * @param brds: benefits/risks/dependencies
   * @param type
   * @param focus
   */
  saveBrds(brds: string[], type: BrdType, focus: Focus): Array<Promise<Brd>> {
    return brds.map(brd => {
      const newBrd = new Brd();
      // To-Do: complete save brds
      newBrd.content = brd;
      newBrd.type = type;
      newBrd.focus = focus;
      return newBrd.save();
    });
  }
}
