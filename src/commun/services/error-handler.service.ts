import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  static handleError(e): void {
    console.error(e, e.errno);
    if (e.errno) {
      switch (e.errno) {
        case 1062: {
          throw new BadRequestException(e);
        }
        default: {
          throw new InternalServerErrorException(e);
        }
      }
    } else {
      throw new InternalServerErrorException(e);
    }
  }
}
