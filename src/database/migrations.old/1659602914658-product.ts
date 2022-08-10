import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class product1659602914658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "products",
                columns:
                    [
                        {
                            name: "id",
                            type: "int",
                            isPrimary:true
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
                            name: "category_id",
                            type: "int"
                        },
                        {
                            name: "brand_id",
                            type: "int"
                        },
                        {
                            name: "imageId",
                            type: "int"
                        },
                        {
                            name: "storeId",
                            type: "int"
                        },
                        {
                            name: "status",
                            type: "varchar"
                        }
                    ],
                    
                foreignKeys: [
                    {
                        columnNames: ["imageId"],
                referencedColumnNames: ["id"],
                referencedTableName: "image",
                onDelete: "SET NULL",
                    },
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
                    }
                ]
            },
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
