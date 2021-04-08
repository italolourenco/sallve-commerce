import { Product } from "./Product";
import { SkuResponse } from "./SkuResponse";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: Product ID
 *          skus:
 *            type: array
 *            description: Products skus in cart
 *            $ref: '#/components/schemas/Sku'
 *
 */

export class ProductResponse {
  id: number;
  skus?: SkuResponse[];

  constructor() {}
}
