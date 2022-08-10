import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class stores1659701969835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "image",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type:"int",
                    isGenerated: true
                },
                {
                    name: "xs",
                    type:"varchar",
                },
                {
                    name: "m",
                    type:"varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("image")
    }

}
