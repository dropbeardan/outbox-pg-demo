import { MigrationInterface, QueryRunner } from "typeorm";

export class RestructureOutboxEventsTableForOERTransformation1693903028583
  implements MigrationInterface
{
  name = "RestructureOutboxEventsTableForOERTransformation1693903028583";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "outbox_events" DROP COLUMN "topic"`);
    await queryRunner.query(`ALTER TABLE "outbox_events" ADD "aggregateid" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "outbox_events" ADD "aggregatetype" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "outbox_events" DROP COLUMN "aggregatetype"`);
    await queryRunner.query(`ALTER TABLE "outbox_events" DROP COLUMN "aggregateid"`);
    await queryRunner.query(`ALTER TABLE "outbox_events" ADD "topic" text NOT NULL`);
  }
}
