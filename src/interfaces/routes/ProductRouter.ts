import { Router, Request, Response } from "express";

import {
  ControllerFactory,
  ControllerType,
} from "../controllers/ControllerFactory";

export class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configRouter();
  }

  private configRouter(): void {
    this.router.get("/", this.getAllProducts);
  }

  /**
   *  @swagger
   *  path:
   *   /products:
   *    get:
   *      summary: List all products
   *      tags: [Product]
   *      responses:
   *        200:
   *          description: List all products data
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Product'
   *              example:
   *                - id: 1
   *                - name: "hidratante labial"
   *                - image: http://cdn.shopify.com/s/files/1/0074/3486/2639/products/sallve-hidratante-labial-1.jpg?v=1605541986"
   *                - skus : [{"sku": 1,"inventory": 2,"price": 20.50}]
   */
  public async getAllProducts(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();
    const controllerGetCar = controllerFactory.createController(
      ControllerType.LIST_PRODUCTS
    );

    const products = await controllerGetCar.handle(request);
    return response.status(200).send(products);
  }
}
