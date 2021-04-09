import { getRepository, Repository } from "typeorm";

import { IProductRepository } from "../../../domain/IProductRepository";
import { Product as TypeOrmProduct } from "../entity/TypeOrmProduct";

export class ProductRepository implements IProductRepository {
  private repository: Repository<TypeOrmProduct>;
  constructor() {
    this.repository = getRepository(TypeOrmProduct);
  }

  async getProductBySku(skuId: number) {
    const product = this.repository
      .createQueryBuilder("product")
      .innerJoinAndSelect("product.skus", "skus")
      .where(`skus.sku = ${skuId}`)
      .getOne();

    return product;
  }

  async listAllProducrs() {
    const products = await this.repository.find({ relations: ["skus"] });
    return products;
  }
}
