import { Request } from "express";

import { DeleteProductUseCase } from "../../application/use_cases/DeleteProductCart";
import { ICacheManager } from "../../infrastructure/cache/ICacheManager";
import { IController } from "./IController";

class DeleteSkuController implements IController {
  constructor(
    private deleteProductUseCase: DeleteProductUseCase,
    private cacheManager: ICacheManager
  ) {}

  async handle(request: Request) {
    const { cartId, sku } = request.params;

    const result = await this.deleteProductUseCase.execute(
      Number(cartId),
      Number(sku)
    );

    if (result.statusCode === 200) {
      await this.cacheManager.delete(cartId);
    }

    return result;
  }
}

export default DeleteSkuController;
