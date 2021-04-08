import { ProductResponse } from "./ProductResponse";

export class CartResponse {
  id: number;
  totalCart?: number;
  totalSkus?: number;
  products?: ProductResponse[];

  constructor(cartId: number) {
    this.id = cartId;
  }
}
