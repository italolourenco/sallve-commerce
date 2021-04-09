/**
 * @swagger
 *  components:
 *    schemas:
 *      CartSku:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: Sku ID
 *          quantity:
 *            type: number
 *            description: Number of skus in Cart
 *          price:
 *            type: number
 *            description: Unitary value
 *          totalPrice:
 *            type: number
 *            description: Total value of skus
 */

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
