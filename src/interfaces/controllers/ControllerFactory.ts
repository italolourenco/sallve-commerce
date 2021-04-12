/* eslint-disable no-case-declarations */
import { AddSkuInCart } from "../../application/use_cases/AddSkuInCart";
import { CreateCartUseCase } from "../../application/use_cases/CreateCartUseCase";
import { DeleteProductUseCase } from "../../application/use_cases/DeleteProductCart";
import { GetCartUseCase } from "../../application/use_cases/GetCartUseCase";
import { ListProductsUseCase } from "../../application/use_cases/ListProducts";
import { UpdateSkuInCart } from "../../application/use_cases/UpdateSkuInCart";
import { CacheManagerFactory } from "../../infrastructure/cache/CacheManagerFactory";
import { CartRepository } from "../../infrastructure/orm/repositories/CartRepository";
import { ProductRepository } from "../../infrastructure/orm/repositories/ProductRepository";
import { SkuRepository } from "../../infrastructure/orm/repositories/SkuRepository";
import AddProductCart from "./AddProductCart";
import CreateCartController from "./CreateCartController";
import DeleteSkuController from "./DeleteSkuController";
import GetCartController from "./GetCartController";
import { IController } from "./IController";
import ListAllProductsController from "./ListAllProductsController";
import UpdateSkuInCartController from "./UpdateSkuInCartController";

export enum ControllerType {
  GET_CART,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  LIST_PRODUCTS,
  CREATE_CART,
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
      case ControllerType.LIST_PRODUCTS:
        return new ListAllProductsController(
          new ListProductsUseCase(new ProductRepository()),
          cacheManager
        );
      case ControllerType.CREATE_CART:
        return new CreateCartController(
          new CreateCartUseCase(new CartRepository())
        );
      default:
        return null;
    }
  }
}
