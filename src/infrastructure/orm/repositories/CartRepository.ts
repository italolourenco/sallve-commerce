import { getRepository, QueryBuilder, Repository } from "typeorm";

import { ICartRepository } from "../../../domain/ICartRepository";
import { Cart } from "../../../domain/models/Cart";
import { Cart as TypeOrmCart } from "../entity/TypeOrmCart";
import { TypeOrmCartSkus } from "../entity/TypeOrmCartSkus";
import { Sku as TypeOrmSku } from "../entity/TypeOrmSku";

export class CartRepository implements ICartRepository {
  private repository: Repository<TypeOrmCart>;
  constructor() {
    this.repository = getRepository(TypeOrmCart);
  }

  async create() {
    const newCartToSave = await this.repository.create();
    const cart = await this.repository.save(newCartToSave);
    return new Cart(cart.id);
  }

  async get(cartId: number): Promise<Cart> {
    const cartData = await this.repository.findOne(cartId, {
      relations: ["skus"],
    });
    if (!cartData) {
      throw new Error("Cart Not found!");
    }

    return new Cart(cartData.id, cartData.skus);
  }

  async addSku(cartId, skuId, quantity) {
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(TypeOrmCartSkus)
      .values({ cart_id: cartId, sku_id: skuId, quantity })
      .execute();
  }

  async getQuantitySkuInCart(cartId, skuId) {
    const relationRepository = getRepository(TypeOrmCartSkus);
    const result = await relationRepository
      .createQueryBuilder()
      .where(`sku_id = ${skuId}`)
      .andWhere(`cart_id = ${cartId}`)
      .getOne();

    return result ? result.quantity : 0;
  }

  async setQuantitySkuInCart(cartId: number, skuId: number, quantity: number) {
    const relationRepository = getRepository(TypeOrmCartSkus);
    const result = await relationRepository
      .createQueryBuilder()
      .update(TypeOrmCartSkus, { quantity })
      .where(`sku_id = ${skuId}`)
      .andWhere(`cart_id = ${cartId}`)
      .execute();

    return result ? result.raw : 0;
  }

  async deleteSkuInCart(cartId: number, skuId: number) {
    const relationRepository = getRepository(TypeOrmCartSkus);
    return relationRepository
      .createQueryBuilder()
      .delete()
      .where(`sku_id = ${skuId}`)
      .andWhere(`cart_id = ${cartId}`)
      .execute();
  }
}
