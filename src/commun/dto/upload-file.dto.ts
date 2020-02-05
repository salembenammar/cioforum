import { IsString } from 'class-validator';

export class UploadFileDto {
  @IsString()
  name: string;

  @IsString()
  originalFileName: string;

  @IsString()
  path: string;
}
