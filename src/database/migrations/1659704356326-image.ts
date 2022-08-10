import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class image1659704356326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "image",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    isGenerated: true,
                    type:"int",
                    isNullable:false
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
