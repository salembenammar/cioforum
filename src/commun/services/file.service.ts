import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from '../repositories/file.repository';
import { File } from '../entities/file.entity';
import { UploadFileDto } from '../dto/upload-file.dto';

@Injectable()
export class FileService {
  private logger = new Logger('FileService');

  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async save(uploadFileDto: UploadFileDto): Promise<File> {
    const { name, path, originalFileName } = uploadFileDto;
    this.logger.log(`Saving file ${name}`);
    const uploadedFile = new File();
    uploadedFile.name = name;
    uploadedFile.path = path;
    uploadedFile.originalFileName = originalFileName;
    try {
      return this.fileRepository.save(uploadedFile);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
