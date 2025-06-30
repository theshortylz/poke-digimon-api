import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCharacters1751278660013 implements MigrationInterface {
    name = 'CreateCharacters1751278660013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "franquicia" varchar NOT NULL, "version" varchar NOT NULL, "metadata" text NOT NULL, "config" text NOT NULL, "data" text NOT NULL, "timestamp" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "characters"`);
    }

}
