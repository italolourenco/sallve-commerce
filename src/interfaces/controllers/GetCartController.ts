import { Request } from "express";

import { GetCartUseCase } from "../../application/use_cases/GetCartUseCase";
import { ICacheManager } from "../../infrastructure/cache/ICacheManager";
import { IController } from "./IController";

class GetCartController implements IController {
  constructor(
    private getCartUseCase: GetCartUseCase,
    private cacheManager: ICacheManager
  ) {}

  async handle(request: Request) {
    const { cartId } = request.params;

    const cacheResult = await this.cacheManager.get(cartId);

    if (!cacheResult) {
      const cart = await this.getCartUseCase.execute(cartId);
      await this.cacheManager.set(cartId, JSON.stringify(cart));
      return cart;
    }

    return JSON.parse(cacheResult);
  }
}

export default GetCartController;
