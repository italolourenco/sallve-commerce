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
   *      tags: [RepositoryResume]
   *      parameters:
   *      - name: cartID
   *        in: "path"
   *        required: true
   *        type: "string"
   *      responses:
   *        200
   *
   */
  public async getCart(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();
    const controllerGetCar = controllerFactory.createController(
      ControllerType.GET_CART
    );

    const cart = await controllerGetCar.handle(request);
    return response.status(200).send(cart);
  }

  public async redirectToDocs(request: Request, response: Response){
    return response.redirect("/docs")
  }

  public async addProduct(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();

    const controllerAddProduct = controllerFactory.createController(
      ControllerType.ADD_PRODUCT
    );

    const result = await controllerAddProduct.handle(request);
    return response.status(result.statusCode).send({ message: result.message });
  }

  public async updateProduct(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();

    const controllerUpdateProduct = controllerFactory.createController(
      ControllerType.UPDATE_PRODUCT
    );

    const result = await controllerUpdateProduct.handle(request);
    return response.status(result.statusCode).send({ message: result.message });
  }

  public async deleteProduct(request: Request, response: Response) {
    const controllerFactory = new ControllerFactory();

    const controllerDeleteProduct = controllerFactory.createController(
      ControllerType.DELETE_PRODUCT
    );

    const result = await controllerDeleteProduct.handle(request);
    return response.status(result.statusCode).send({ message: result.message });
  }
}
