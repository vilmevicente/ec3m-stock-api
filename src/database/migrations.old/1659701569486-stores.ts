import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class stores1659701569486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table( {
            name:"store",
            columns:[
                {
                    name: "store_id",
                    isPrimary: true,
                    type:"int",
                    isGenerated:false
                },
                {
                    name: "store",
                    type:"varchar",

                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("store")
    }

}
