import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class category1659704277053 implements MigrationInterface {

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
                    name:"title",
                    type:"varchar",
                },
                {
                    name:"status",
                    type:"varchar",
                }
                ,
                {
                    name:"order",
                    type:"int",
                },
                {
                    name:"all_stores",
                    type:"varchar",
                }
             ,
                {
                    name:"products_order",
                    type:"varchar"
                },
               
                {
                    name:"kitchen_request",
                    type:"varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category")
    }

}
