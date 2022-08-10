import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class store1659704205553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table( {
            name:"store",
            columns:[
                {
                    name: "id",
                    isPrimary: true,
                    type:"int",
                    isGenerated:false
                },
                {
                    name: "title",
                    type:"varchar",

                },
                {
                    name: "type",
                    type:"varchar",

                },
                {
                    name: "tax_id",
                    type:"varchar",

                },
                {
                    name: "tax_exemption",
                    type:"varchar",

                },
                {
                    name: "tax_exemption_law",
                    type:"varchar",

                },
                {
                    name: "status",
                    type:"varchar",

                },
                {
                    name: "sync_pos",
                    type:"varchar",

                },
                {
                    name: "sync_pos_ping",
                    type:"varchar",

                },
        
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("store")

    }

}
