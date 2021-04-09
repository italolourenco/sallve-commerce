import { Product } from "./Product";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Sku:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: Sku ID
 *          inventory:
 *            type: number
 *            description: Available quantity
 *          price:
 *            type: number
 *            description: Unitary value
 */

export class Sku {
  sku: number;
  inventory: number;
  price: number;
  product: Product;
}
