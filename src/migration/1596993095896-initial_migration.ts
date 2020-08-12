import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1596993095896 implements MigrationInterface {
    name = 'initialMigration1596993095896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "set" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "set" varchar NOT NULL, "set_name" varchar NOT NULL, "set_icon" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "color" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "color" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "card" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "cmc" integer NOT NULL, "rarity" varchar NOT NULL, "type_line" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "card_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image_uri" varchar NOT NULL, "face_name" varchar NOT NULL, "cardId" integer)`);
        await queryRunner.query(`CREATE TABLE "sub_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "super_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "card_sets_set" ("cardId" integer NOT NULL, "setId" integer NOT NULL, PRIMARY KEY ("cardId", "setId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd20fcfddab994175eb317a873" ON "card_sets_set" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_52b977cdacd9a3f541162f2101" ON "card_sets_set" ("setId") `);
        await queryRunner.query(`CREATE TABLE "card_colors_color" ("cardId" integer NOT NULL, "colorId" integer NOT NULL, PRIMARY KEY ("cardId", "colorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0b676297382896fe815b790c0" ON "card_colors_color" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e55dd9056ae1ada0dea6fe8f41" ON "card_colors_color" ("colorId") `);
        await queryRunner.query(`CREATE TABLE "temporary_card_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image_uri" varchar NOT NULL, "face_name" varchar NOT NULL, "cardId" integer, CONSTRAINT "FK_d7fab7cba45de6bb71a17831db5" FOREIGN KEY ("cardId") REFERENCES "card" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_card_images"("id", "image_uri", "face_name", "cardId") SELECT "id", "image_uri", "face_name", "cardId" FROM "card_images"`);
        await queryRunner.query(`DROP TABLE "card_images"`);
        await queryRunner.query(`ALTER TABLE "temporary_card_images" RENAME TO "card_images"`);
        await queryRunner.query(`DROP INDEX "IDX_fd20fcfddab994175eb317a873"`);
        await queryRunner.query(`DROP INDEX "IDX_52b977cdacd9a3f541162f2101"`);
        await queryRunner.query(`CREATE TABLE "temporary_card_sets_set" ("cardId" integer NOT NULL, "setId" integer NOT NULL, CONSTRAINT "FK_fd20fcfddab994175eb317a873b" FOREIGN KEY ("cardId") REFERENCES "card" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_52b977cdacd9a3f541162f2101c" FOREIGN KEY ("setId") REFERENCES "set" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("cardId", "setId"))`);
        await queryRunner.query(`INSERT INTO "temporary_card_sets_set"("cardId", "setId") SELECT "cardId", "setId" FROM "card_sets_set"`);
        await queryRunner.query(`DROP TABLE "card_sets_set"`);
        await queryRunner.query(`ALTER TABLE "temporary_card_sets_set" RENAME TO "card_sets_set"`);
        await queryRunner.query(`CREATE INDEX "IDX_fd20fcfddab994175eb317a873" ON "card_sets_set" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_52b977cdacd9a3f541162f2101" ON "card_sets_set" ("setId") `);
        await queryRunner.query(`DROP INDEX "IDX_f0b676297382896fe815b790c0"`);
        await queryRunner.query(`DROP INDEX "IDX_e55dd9056ae1ada0dea6fe8f41"`);
        await queryRunner.query(`CREATE TABLE "temporary_card_colors_color" ("cardId" integer NOT NULL, "colorId" integer NOT NULL, CONSTRAINT "FK_f0b676297382896fe815b790c0d" FOREIGN KEY ("cardId") REFERENCES "card" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_e55dd9056ae1ada0dea6fe8f41a" FOREIGN KEY ("colorId") REFERENCES "color" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("cardId", "colorId"))`);
        await queryRunner.query(`INSERT INTO "temporary_card_colors_color"("cardId", "colorId") SELECT "cardId", "colorId" FROM "card_colors_color"`);
        await queryRunner.query(`DROP TABLE "card_colors_color"`);
        await queryRunner.query(`ALTER TABLE "temporary_card_colors_color" RENAME TO "card_colors_color"`);
        await queryRunner.query(`CREATE INDEX "IDX_f0b676297382896fe815b790c0" ON "card_colors_color" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e55dd9056ae1ada0dea6fe8f41" ON "card_colors_color" ("colorId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e55dd9056ae1ada0dea6fe8f41"`);
        await queryRunner.query(`DROP INDEX "IDX_f0b676297382896fe815b790c0"`);
        await queryRunner.query(`ALTER TABLE "card_colors_color" RENAME TO "temporary_card_colors_color"`);
        await queryRunner.query(`CREATE TABLE "card_colors_color" ("cardId" integer NOT NULL, "colorId" integer NOT NULL, PRIMARY KEY ("cardId", "colorId"))`);
        await queryRunner.query(`INSERT INTO "card_colors_color"("cardId", "colorId") SELECT "cardId", "colorId" FROM "temporary_card_colors_color"`);
        await queryRunner.query(`DROP TABLE "temporary_card_colors_color"`);
        await queryRunner.query(`CREATE INDEX "IDX_e55dd9056ae1ada0dea6fe8f41" ON "card_colors_color" ("colorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0b676297382896fe815b790c0" ON "card_colors_color" ("cardId") `);
        await queryRunner.query(`DROP INDEX "IDX_52b977cdacd9a3f541162f2101"`);
        await queryRunner.query(`DROP INDEX "IDX_fd20fcfddab994175eb317a873"`);
        await queryRunner.query(`ALTER TABLE "card_sets_set" RENAME TO "temporary_card_sets_set"`);
        await queryRunner.query(`CREATE TABLE "card_sets_set" ("cardId" integer NOT NULL, "setId" integer NOT NULL, PRIMARY KEY ("cardId", "setId"))`);
        await queryRunner.query(`INSERT INTO "card_sets_set"("cardId", "setId") SELECT "cardId", "setId" FROM "temporary_card_sets_set"`);
        await queryRunner.query(`DROP TABLE "temporary_card_sets_set"`);
        await queryRunner.query(`CREATE INDEX "IDX_52b977cdacd9a3f541162f2101" ON "card_sets_set" ("setId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd20fcfddab994175eb317a873" ON "card_sets_set" ("cardId") `);
        await queryRunner.query(`ALTER TABLE "card_images" RENAME TO "temporary_card_images"`);
        await queryRunner.query(`CREATE TABLE "card_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image_uri" varchar NOT NULL, "face_name" varchar NOT NULL, "cardId" integer)`);
        await queryRunner.query(`INSERT INTO "card_images"("id", "image_uri", "face_name", "cardId") SELECT "id", "image_uri", "face_name", "cardId" FROM "temporary_card_images"`);
        await queryRunner.query(`DROP TABLE "temporary_card_images"`);
        await queryRunner.query(`DROP INDEX "IDX_e55dd9056ae1ada0dea6fe8f41"`);
        await queryRunner.query(`DROP INDEX "IDX_f0b676297382896fe815b790c0"`);
        await queryRunner.query(`DROP TABLE "card_colors_color"`);
        await queryRunner.query(`DROP INDEX "IDX_52b977cdacd9a3f541162f2101"`);
        await queryRunner.query(`DROP INDEX "IDX_fd20fcfddab994175eb317a873"`);
        await queryRunner.query(`DROP TABLE "card_sets_set"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "super_type"`);
        await queryRunner.query(`DROP TABLE "sub_type"`);
        await queryRunner.query(`DROP TABLE "card_images"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "set"`);
    }

}
