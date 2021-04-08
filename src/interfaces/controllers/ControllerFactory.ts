/* eslint-disable no-case-declarations */
import { AddSkuInCart } from "../../application/use_cases/AddSkuInCart";
import { DeleteProductUseCase } from "../../application/use_cases/DeleteProductCart";
import { GetCartUseCase } from "../../application/use_cases/GetCartUseCase";
import { UpdateSkuInCart } from "../../application/use_cases/UpdateSkuInCart";
import { CacheManagerFactory } from "../../infrastructure/cache/CacheManagerFactory";
import { CartRepository } from "../../infrastructure/orm/repositories/CartRepository";
import { ProductRepository } from "../../infrastructure/orm/repositories/ProductRepository";
import { SkuRepository } from "../../infrastructure/orm/repositories/SkuRepository";
import AddProductCart from "./AddProductCart";
import DeleteSkuController from "./DeleteSkuController";
import GetCartController from "./GetCartController";
import { IController } from "./IController";
import UpdateSkuInCartController from "./UpdateSkuInCartController";

export enum ControllerType {
  GET_CART,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
}

export class ControllerFactory {
  createController(controllerName: ControllerType): IController {
    const cacheFactory = CacheManagerFactory.getInstance();
    const cacheManager = cacheFactory.createCacheManager();
    switch (controllerName) {
      case ControllerType.GET_CART:
        return new GetCartController(
          new GetCartUseCase(new CartRepository(), new ProductRepository()),
          cacheManager
        );
      case ControllerType.ADD_PRODUCT:
        return new AddProductCart(
          new AddSkuInCart(new CartRepository(), new SkuRepository()),
          cacheManager
        );
      case ControllerType.UPDATE_PRODUCT:
        return new UpdateSkuInCartController(
          new UpdateSkuInCart(new CartRepository(), new SkuRepository()),
          cacheManager
        );
      case ControllerType.DELETE_PRODUCT:
        return new DeleteSkuController(
          new DeleteProductUseCase(new CartRepository(), new SkuRepository()),
          cacheManager
        );
      default:
        return null;
    }
  }
}
