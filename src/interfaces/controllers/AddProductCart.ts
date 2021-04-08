import { Request } from "express";

import { AddSkuInCart } from "../../application/use_cases/AddSkuInCart";
import { ICacheManager } from "../../infrastructure/cache/ICacheManager";
import { IController } from "./IController";

class AddProductCart implements IController {
  constructor(
    private AddSkuInCart: AddSkuInCart,
    private cacheManager: ICacheManager
  ) {}

  async handle(request: Request) {
    const { cartId } = request.params;
    const { sku, quantity } = request.body;

    const result = await this.AddSkuInCart.execute(
      Number(cartId),
      sku,
      quantity
    );

    if (result.statusCode === 200) {
      await this.cacheManager.delete(cartId);
    }

    return result;
  }
}

export default AddProductCart;
