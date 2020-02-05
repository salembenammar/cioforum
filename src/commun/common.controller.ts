import {
  BadRequestException,
  Controller,
  Header,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './services/file.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { File } from './entities/file.entity';
import { validate } from 'class-validator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('common')
export class CommonController {
  constructor(private fileService: FileService) {}
  @ApiBearerAuth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Req() request: Request): Promise<File> {
    if (!file) {
      throw new BadRequestException('Unable to find attached file');
    } else {
      const uploadFileDto: UploadFileDto = {
        name: file.filename,
        originalFileName: file.originalname,
        path: file.path,
      };
      return this.fileService.save(uploadFileDto);
    }
  }
}
