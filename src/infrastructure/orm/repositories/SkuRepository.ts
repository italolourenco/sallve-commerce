import { getRepository, Repository } from "typeorm";

import { ISkuRepository } from "../../../domain/ISkuRepository";
import { Sku as TypeOrmSku } from "../entity/TypeOrmSku";

export class SkuRepository implements ISkuRepository {
  private repository: Repository<TypeOrmSku>;
  constructor() {
    this.repository = getRepository(TypeOrmSku);
  }

  async get(skuId: number) {
    return this.repository.findOne(skuId);
  }

  async updateInventory(skuId: number, inventory: number) {
    return this.repository
      .createQueryBuilder()
      .update(TypeOrmSku, { inventory })
      .where(`sku = ${skuId}`)
      .execute();
  }
}
