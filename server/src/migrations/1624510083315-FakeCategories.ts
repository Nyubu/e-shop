import {MigrationInterface, QueryRunner} from "typeorm";

export class FakeCategories1624510083315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into category (name) values ('Vegetables');
        insert into category (name) values ('Meat');
        insert into category (name) values ('Bread');
        insert into category (name) values ('Dairy');`)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
