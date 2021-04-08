import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProducts1617539278669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO product (id, name, image) VALUES" +
        "(1, 'hidratante labial','http://cdn.shopify.com/s/files/1/0074/3486/2639/products/sallve-hidratante-labial-1.jpg?v=1605541986')," +
        "(2,'limpador facial','http://cdn.shopify.com/s/files/1/0074/3486/2639/products/sallve-limpador-facial-1.jpg?v=1597658319')," +
        "(3,'hidratante firmador', 'http://cdn.shopify.com/s/files/1/0074/3486/2639/products/sallve-hidratante-firmador.jpg?v=1597658578')," +
        "(4,'esfoliante enzimático', 'http://cdn.shopify.com/s/files/1/0074/3486/2639/products/sallve-esfoliante-enzimatico-1-a.jpg?v=1597658287')," +
        "(5,'bálsamo demaquilante', 'http://cdn.shopify.com/s/files/1/0074/3486/2639/products/balsamo-demaquilante-1.jpg?v=1601986306')," +
        "(6,'antioxidante hidratante','http://cdn.shopify.com/s/files/1/0074/3486/2639/products/sallve-antioxidante-hidratante-1.jpg?v=1605127205')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DELETE FROM product");
  }
}
