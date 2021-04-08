import { Request } from "express";

import { UpdateSkuInCart } from "../../application/use_cases/UpdateSkuInCart";
import { ICacheManager } from "../../infrastructure/cache/ICacheManager";
import { IController } from "./IController";

class UpdateSkuInCartController implements IController {
  constructor(
    private updateSkuInCart: UpdateSkuInCart,
    private cacheManager: ICacheManager
  ) {}

  async handle(request: Request) {
    const { cartId } = request.params;
    const { sku, quantity } = request.body;

    const result = await this.updateSkuInCart.execute(
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

export default UpdateSkuInCartController;
