import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertSkus1617539294298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO sku (sku, inventory, price, product_id) VALUES" +
        "(1, 2,20.00,1)," +
        "(2, 5,10.00,1)," +
        "(3, 10,22.00,2)," +
        "(4, 3,24.00,2)," +
        "(5, 4,23.00,3)," +
        "(6, 1,20.50,4)," +
        "(7, 10,15.50,4)," +
        "(8, 0,34.99,4)," +
        "(9, 6,35.50,5)," +
        "(10, 4,15.99,5)," +
        "(11, 3,99.00,6)," +
        "(12, 2,10.00,6);"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DELETE FROM sku");
  }
}
