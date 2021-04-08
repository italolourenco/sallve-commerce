export class SkuResponse {
  sku: number;
  quantity: number;
  price: number;
  totalPrice: number;

  constructor(
    sku: number,
    quantity: number,
    price: number,
    totalPrice: number
  ) {
    this.sku = sku;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
  }
}
