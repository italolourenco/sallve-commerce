import { ProductResponse } from "./ProductResponse";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Cart:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: Cart ID
 *          totalCart:
 *            type: number
 *            description: Total price in cart
 *          totalSkus:
 *            type: number
 *            description: Number of skus in cart
 *          products:
 *            type: array
 *            description: Products in cart
 *            $ref: '#/components/schemas/Product'
 *
 *
 */

export class CartResponse {
  id: number;
  totalCart?: number;
  totalSkus?: number;
  products?: ProductResponse[];

  constructor(cartId: number) {
    this.id = cartId;
  }
}
