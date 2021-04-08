import { ICartRepository } from "../../domain/ICartRepository";
import { ISkuRepository } from "../../domain/ISkuRepository";
import { Sku } from "../../domain/models/Sku";

export class AddSkuInCart {
  constructor(
    private cartRepository: ICartRepository,
    private skuRepository: ISkuRepository
  ) {}

  async execute(cartId: number, skuId: number, quantity: number) {
    try {
      await this.verifyIfCartExist(cartId);
      const sku = await this.verifyIfSkuExist(skuId);

      const quantityInCart = await this.cartRepository.getQuantitySkuInCart(
        cartId,
        skuId
      );

      const newInventoryValue = quantityInCart + quantity;
      const checkNewInventoryValueIsValid = sku.inventory - quantity;

      if (checkNewInventoryValueIsValid < 0) {
        return { statusCode: 400, message: "Invalid Sku Quantity" };
      }

      quantityInCart <= 0
        ? await this.cartRepository.addSku(cartId, skuId, quantity)
        : await this.cartRepository.setQuantitySkuInCart(
            cartId,
            skuId,
            newInventoryValue
          );

      await this.skuRepository.updateInventory(
        skuId,
        checkNewInventoryValueIsValid
      );

      return { statusCode: 200, message: "Sku Added Successfully" };
    } catch (error) {
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
