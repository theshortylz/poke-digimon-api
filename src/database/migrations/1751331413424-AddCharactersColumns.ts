import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCharactersColumns1751331413424 implements MigrationInterface {
    name = 'AddCharactersColumns1751331413424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_characters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "franquicia" varchar NOT NULL, "version" varchar NOT NULL, "metadata" text NOT NULL, "config" text NOT NULL, "data" text NOT NULL, "timestamp" varchar NOT NULL, "status" varchar(10) NOT NULL DEFAULT ('success'), "errorMessage" text)`);
        await queryRunner.query(`INSERT INTO "temporary_characters"("id", "franquicia", "version", "metadata", "config", "data", "timestamp") SELECT "id", "franquicia", "version", "metadata", "config", "data", "timestamp" FROM "characters"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`ALTER TABLE "temporary_characters" RENAME TO "characters"`);
        await queryRunner.query(`CREATE TABLE "temporary_characters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "franquicia" varchar NOT NULL, "version" varchar NOT NULL, "metadata" text NOT NULL, "config" text NOT NULL, "data" text, "timestamp" varchar NOT NULL, "status" varchar(10) NOT NULL DEFAULT ('success'), "errorMessage" text)`);
        await queryRunner.query(`INSERT INTO "temporary_characters"("id", "franquicia", "version", "metadata", "config", "data", "timestamp", "status", "errorMessage") SELECT "id", "franquicia", "version", "metadata", "config", "data", "timestamp", "status", "errorMessage" FROM "characters"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`ALTER TABLE "temporary_characters" RENAME TO "characters"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" RENAME TO "temporary_characters"`);
        await queryRunner.query(`CREATE TABLE "characters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "franquicia" varchar NOT NULL, "version" varchar NOT NULL, "metadata" text NOT NULL, "config" text NOT NULL, "data" text NOT NULL, "timestamp" varchar NOT NULL, "status" varchar(10) NOT NULL DEFAULT ('success'), "errorMessage" text)`);
        await queryRunner.query(`INSERT INTO "characters"("id", "franquicia", "version", "metadata", "config", "data", "timestamp", "status", "errorMessage") SELECT "id", "franquicia", "version", "metadata", "config", "data", "timestamp", "status", "errorMessage" FROM "temporary_characters"`);
        await queryRunner.query(`DROP TABLE "temporary_characters"`);
        await queryRunner.query(`ALTER TABLE "characters" RENAME TO "temporary_characters"`);
        await queryRunner.query(`CREATE TABLE "characters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "franquicia" varchar NOT NULL, "version" varchar NOT NULL, "metadata" text NOT NULL, "config" text NOT NULL, "data" text NOT NULL, "timestamp" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "characters"("id", "franquicia", "version", "metadata", "config", "data", "timestamp") SELECT "id", "franquicia", "version", "metadata", "config", "data", "timestamp" FROM "temporary_characters"`);
        await queryRunner.query(`DROP TABLE "temporary_characters"`);
    }

}
