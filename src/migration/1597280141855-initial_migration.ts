import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1597280141855 implements MigrationInterface {
    name = 'initialMigration1597280141855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "set" ("id" SERIAL NOT NULL, "set" character varying NOT NULL, "set_name" character varying NOT NULL, "set_icon" character varying NOT NULL, CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cmc" integer NOT NULL, "rarity" character varying NOT NULL, "type_line" character varying NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_images" ("id" SERIAL NOT NULL, "image_uri" character varying NOT NULL, "face_name" character varying NOT NULL, "cardId" integer, CONSTRAINT "PK_402596c7513fbd3cc45750c8e16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_794cc1eaeaa3bda4c067be72fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "super_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d9d03da4eaa8360a749d82d54d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_sets_set" ("cardId" integer NOT NULL, "setId" integer NOT NULL, CONSTRAINT "PK_0831b71a2d24c0f8e8207b8f6fc" PRIMARY KEY ("cardId", "setId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd20fcfddab994175eb317a873" ON "card_sets_set" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_52b977cdacd9a3f541162f2101" ON "card_sets_set" ("setId") `);
        await queryRunner.query(`CREATE TABLE "card_colors_color" ("cardId" integer NOT NULL, "colorId" integer NOT NULL, CONSTRAINT "PK_5c34d1a420a95e7b3e1fb9295c3" PRIMARY KEY ("cardId", "colorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0b676297382896fe815b790c0" ON "card_colors_color" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e55dd9056ae1ada0dea6fe8f41" ON "card_colors_color" ("colorId") `);
        await queryRunner.query(`ALTER TABLE "card_images" ADD CONSTRAINT "FK_d7fab7cba45de6bb71a17831db5" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_sets_set" ADD CONSTRAINT "FK_fd20fcfddab994175eb317a873b" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_sets_set" ADD CONSTRAINT "FK_52b977cdacd9a3f541162f2101c" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_colors_color" ADD CONSTRAINT "FK_f0b676297382896fe815b790c0d" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_colors_color" ADD CONSTRAINT "FK_e55dd9056ae1ada0dea6fe8f41a" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card_colors_color" DROP CONSTRAINT "FK_e55dd9056ae1ada0dea6fe8f41a"`);
        await queryRunner.query(`ALTER TABLE "card_colors_color" DROP CONSTRAINT "FK_f0b676297382896fe815b790c0d"`);
        await queryRunner.query(`ALTER TABLE "card_sets_set" DROP CONSTRAINT "FK_52b977cdacd9a3f541162f2101c"`);
        await queryRunner.query(`ALTER TABLE "card_sets_set" DROP CONSTRAINT "FK_fd20fcfddab994175eb317a873b"`);
        await queryRunner.query(`ALTER TABLE "card_images" DROP CONSTRAINT "FK_d7fab7cba45de6bb71a17831db5"`);
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
