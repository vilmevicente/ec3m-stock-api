import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class category1659609136049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"category",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true
                },
                {
                    name:"tittle",
                    type:"varchar",
                },
                {
                    name:"status",
                    type:"varchar",
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category")
    }

}
