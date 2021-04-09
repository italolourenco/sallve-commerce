import { Sku } from "./Sku";

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
 *          name:
 *            type: string
 *            description: Product Name
 *          image:
 *            type: string
 *            description: Product Image url
 *          skus:
 *            type: array
 *            description: Related Skus
 *            $ref: '#/components/schemas/Sku'
 *
 */

export class Product {
  id: number;
  name: string;
  image: string;
  skus: Sku[];
}
