import { ICartRepository } from "../../domain/ICartRepository";
import { ISkuRepository } from "../../domain/ISkuRepository";
import { Sku } from "../../domain/models/Sku";

export class DeleteProductUseCase {
  constructor(
    private cartRepository: ICartRepository,
    private skuRepository: ISkuRepository
  ) {}

  async execute(cartId: number, skuId: number) {
    try {
      await this.verifyIfCartExist(cartId);
      const sku = await this.verifyIfSkuExist(skuId);

      const quantityInCart = await this.cartRepository.getQuantitySkuInCart(
        cartId,
        skuId
      );

      const newInventoryValue = quantityInCart + sku.inventory;
      await this.cartRepository.deleteSkuInCart(cartId, skuId);
      await this.skuRepository.updateInventory(skuId, newInventoryValue);

      return { statusCode: 200, message: "Sku deleted successfully!" };
    } catch (error) {
      console.log("error", error);
      return { statusCode: 404, message: error.message };
    }
  }

  async verifyIfCartExist(cartId: number): Promise<boolean> {
    const cart = await this.cartRepository.get(cartId);
    if (!cart) {
      throw new Error("Cart not found !");
    }

    return !!cart;
  }

  async verifyIfSkuExist(skuId: number): Promise<Sku> {
    const sku = await this.skuRepository.get(skuId);
    if (!sku) {
      throw new Error("Sku not found !");
    }

    return sku;
  }
}
