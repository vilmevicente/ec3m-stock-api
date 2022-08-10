import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class product1659704648732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "product",
                columns:
                    [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true
                        },
                        {
                            name: "order",
                            type: "int",

                        },
                        {
                            name: "reference",
                            type: "varchar"
                        },
                        {
                            name: "barcode",
                            type: "varchar"
                        },
                        {
                            name: "supplier_code",
                            type: "varchar"
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "include_description",
                            type: "varchar"
                        },
                        {
                            name: "supply_price",
                            type: "int"
                        },
                        {
                            name: "gross_price",
                            type: "int"
                        },
                        {
                            name: "prices",
                            type: "int"
                        },
                        {
                            name: "unit_id",
                            type: "varchar"
                        },
                        {
                            name: "type_id",
                            type: "varchar"
                        },
                        {
                            name: "class_id",
                            type: "varchar"
                        },
                        {
                            name: "stock_control",
                            type: "varchar"
                        },
                        {
                            name: "stock_type",
                            type: "varchar"
                        },
                        {
                            name: "tax_id",
                            type: "int"
                        },
                        {
                            name: "tax_exemption",
                            type: "varchar"
                        },
                        {
                            name: "categoryId",
                            type: "int",
                            isNullable:true
                        },
                        {
                            name: "brand_id",
                            type: "int"
                        },
                        {
                            name: "imageId",
                            type: "int",
                            isNullable:true
                        },
                        {
                            name: "storeId",
                            type: "int",
                            isNullable:true
                        },
                        {
                            name: "status",
                            type: "varchar"
                        }
                    ],

                foreignKeys: [
                    
                    {
                        columnNames: ["categoryId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "category",
                        onDelete: "SET NULL",
                    },
                    {
                        columnNames: ["storeId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "store",
                        onDelete: "SET NULL",
                    },
                    {
                        columnNames: ["imageId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "image",
                        onDelete: "SET NULL",
                    }
                ]
            },
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product")
    }

}
