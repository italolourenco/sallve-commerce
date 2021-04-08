import { Router, Request, Response } from "express";

import {
  ControllerFactory,
  ControllerType,
} from "../controllers/ControllerFactory";

export class CartRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configRouter();
  }

  private configRouter(): void {
    this.router.get("/", this.redirectToDocs);
    this.router.get("/:cartId", this.getCart);
    this.router.post("/:cartId/product", this.addProduct);
    this.router.put("/:cartId/product", this.updateProduct);
    this.router.delete("/:cartId/product/:sku", this.deleteProduct);
  }

  /**
   *  @swagger
   *  path:
   *   /{cartId}:
   *    get:
   *      summary: Get cart
   *      tags: [Cart]
   *      parameters:
   *      - name: cartId
   *        in: "path"
   *        required: true
   *        type: "string"
   *      responses:
   *        200:
   *          description: Get cart data by id
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Cart'
   *              example:
   *                - id: 1
   *                - totalCart: 0.0
   *                - totalSkus: 0
   *                - products : []
   */
  public async getCart(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();
    const controllerGetCar = controllerFactory.createController(
      ControllerType.GET_CART
    );

    const cart = await controllerGetCar.handle(request);
    return response.status(200).send(cart);
  }

  public async redirectToDocs(request: Request, response: Response) {
    return response.redirect("/docs");
  }

  /**
   *  @swagger
   *  path:
   *   /{cartId}/product:
   *    post:
   *      summary: Add an sku in cart
   *      tags: [Cart]
   *      parameters:
   *      - name: cartId
   *        in: "path"
   *        required: true
   *        type: "string"
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                sku:
   *                  type: string
   *                quantity:
   *                  type: number
   *              example:
   *                sku: "1"
   *                quantity: 10
   *      responses:
   *        200:
   *          description: Sku Added Successfully
   *        400:
   *          description: Invalid Sku Quantity
   *        404:
   *          description: Cart not found ! / Sku not found !
   *
   *
   *
   */
  public async addProduct(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();

    const controllerAddProduct = controllerFactory.createController(
      ControllerType.ADD_PRODUCT
    );

    const result = await controllerAddProduct.handle(request);
    return response.status(result.statusCode).send({ message: result.message });
  }

  /**
   *  @swagger
   *  path:
   *   /{cartId}/product:
   *    put:
   *      summary: Update an sku in cart
   *      tags: [Cart]
   *      parameters:
   *      - name: cartId
   *        description : Cart ID value
   *        in: "path"
   *        required: true
   *        type: "string"
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                sku:
   *                  type: string
   *                quantity:
   *                  type: number
   *              example:
   *                sku: "1"
   *                quantity: 10
   *      responses:
   *        200:
   *          description: Sku Update Successfully
   *        400:
   *          description: Invalid Sku Quantity
   *        404:
   *          description: Cart not found ! / Sku not found !
   *
   *
   */

  public async updateProduct(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();

    const controllerUpdateProduct = controllerFactory.createController(
      ControllerType.UPDATE_PRODUCT
    );

    const result = await controllerUpdateProduct.handle(request);
    return response.status(result.statusCode).send({ message: result.message });
  }

  /**
   *  @swagger
   *  path:
   *   /{cartId}/product/{sku}:
   *    delete:
   *      summary: Delete an sku in cart
   *      tags: [Cart]
   *      parameters:
   *      - name: cartId
   *        in: "path"
   *        required: true
   *        type: string
   *      - name: sku
   *        in: "path"
   *        required: true
   *        type: string
   *      responses:
   *        200:
   *          description: Sku deleted successfully!
   *        404:
   *          description: Cart not found ! / Sku not found !
   *
   *
   */

  public async deleteProduct(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();

    const controllerDeleteProduct = controllerFactory.createController(
      ControllerType.DELETE_PRODUCT
    );

    const result = await controllerDeleteProduct.handle(request);
    return response.status(result.statusCode).send({ message: result.message });
  }
}
