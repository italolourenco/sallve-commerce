import { Request } from "express";

import { ListProductsUseCase } from "../../application/use_cases/ListProducts";
import { ICacheManager } from "../../infrastructure/cache/ICacheManager";
import { IController } from "./IController";

class ListAllProductsController implements IController {
  constructor(
    private listAllProductsUseCase: ListProductsUseCase,
    private cacheManager: ICacheManager
  ) {}

  async handle(request: Request) {
    return this.listAllProductsUseCase.execute();

    // const cacheResult = await this.cacheManager.get(cartId);

    // if (!cacheResult) {
    //   const cart = await this.getCartUseCase.execute(cartId);
    //   await this.cacheManager.set(cartId, JSON.stringify(cart));
    //   return cart;
    // }

    // return JSON.parse(cacheResult);
  }
}

export default ListAllProductsController;
