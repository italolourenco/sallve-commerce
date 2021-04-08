import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCartSkuTable1617653253921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart_skus",
        columns: [
          {
            name: "sku_id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "cart_id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "quantity",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "skuCart",
            referencedTableName: "sku",
            referencedColumnNames: ["sku"],
            columnNames: ["sku_id"],
          },
          {
            name: "cartSku",
            referencedTableName: "cart",
            referencedColumnNames: ["id"],
            columnNames: ["cart_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart_skus");
  }
}
