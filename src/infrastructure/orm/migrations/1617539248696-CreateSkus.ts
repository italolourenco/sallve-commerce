import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSkus1617539248696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sku",
        columns: [
          {
            name: "sku",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "inventory",
            type: "integer",
          },
          {
            name: "price",
            type: "float",
          },
          {
            name: "product_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "productSku",
            referencedTableName: "product",
            referencedColumnNames: ["id"],
            columnNames: ["product_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sku");
  }
}
