import { Cart } from "./models/Cart";

export interface ICartRepository {
  create(cartId: number): Promise<Cart>;
  get(cartId: number): Promise<Cart>;
  addSku(cart, sku, quantity): Promise<boolean>;
  getQuantitySkuInCart(cartId: number, skuId: number): Promise<number>;
  setQuantitySkuInCart(cartId: number, skuId: number, quantity: number);
  deleteSkuInCart(cartId: number, skuId: number);
}
