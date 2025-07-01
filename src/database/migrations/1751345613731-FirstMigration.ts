import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1751345613731 implements MigrationInterface {
    name = 'FirstMigration1751345613731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characters" ("id" varchar PRIMARY KEY NOT NULL, "franchise" varchar(10) NOT NULL DEFAULT ('pokemon'), "version" varchar(20) NOT NULL, "metadata" text NOT NULL, "config" text NOT NULL, "status" varchar(10) NOT NULL DEFAULT ('success'), "errorMessage" text, "timestamp" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "characters"`);
    }

}
