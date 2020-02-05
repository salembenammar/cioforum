import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import * as files from '../../fixtures/files.json';
export class Seeding1567415732313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return getRepository('file').save(files);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
