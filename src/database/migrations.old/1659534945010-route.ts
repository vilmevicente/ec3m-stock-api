import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class route1659534945010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "stock",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true

                },
                {
                    name: "product_id",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "amount",
                    type: "int",
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                    name: "store_id",
                    type: "int",
                },
                {
                    name: "stockAlert",
                    type: "int",
                },
                {
                    name: "obs",
                    type: "varchar",
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("stock")
    }

}
