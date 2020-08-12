import { MigrationInterface, QueryRunner } from 'typeorm';
import { ColorEntity } from 'src/card/color/color.entity';

export class colorsSeed1596993281624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository<ColorEntity>(ColorEntity)
      .save([
        { color: 'W' },
        { color: 'U' },
        { color: 'B' },
        { color: 'R' },
        { color: 'G' },
        { color: 'N' },
      ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository<ColorEntity>(ColorEntity)
      .createQueryBuilder()
      .delete()
      .from(ColorEntity)
      .execute();
  }
}
