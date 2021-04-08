import { AddSkuInCart } from "../../../src/application/use_cases/AddSkuInCart";
import { DeleteProductUseCase } from "../../../src/application/use_cases/DeleteProductCart";
import { ICartRepository } from "../../../src/domain/ICartRepository";
import { ISkuRepository } from "../../../src/domain/ISkuRepository";

const fakeCartRepository = {
  get: (cartId) => {
    //
  },
  getQuantitySkuInCart: (cartId, skuId) => {
    //
  },
  create: (cartId) => {
    //
  },
  addSku: (cartId, skuId, quantity) => {
    //
  },
  setQuantitySkuInCart: (cartId, skuId, quantity) => {
    //
  },
  deleteSkuInCart: (cartId, skuId) => {
    //
  },
} as ICartRepository;

const fakeSkuRepository = {
  get: (skuId) => {
    //
  },
  updateInventory: (skuId, inventory) => {
    //
  },
} as ISkuRepository;

const skuData = {
  sku: 1,
  inventory: 2,
  price: 10.5,
};

const payloadInvalidCart = {
  cartId: 10,
  skuId: 2,
};

const payloadValidCart = {
  cartId: 10,
  skuId: 2,
};

describe("Test Delete Sku in Cart Use Case", () => {
  describe("Test send invalid cart", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(false);
    });
    it("should get message error for invalid cart", async (done) => {
      const deleteProductCart = new DeleteProductUseCase(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await deleteProductCart.execute(
        payloadInvalidCart.cartId,
        payloadInvalidCart.skuId
      );

      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual("Cart not found !");

      done();
    });
  });

  describe("Test send invalid sku", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(true);
      spyOn(fakeSkuRepository, "get").and.returnValue(false);
    });
    it("should get message error for invalid cart", async (done) => {
      const deleteProductCart = new DeleteProductUseCase(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await deleteProductCart.execute(
        payloadInvalidCart.cartId,
        payloadInvalidCart.skuId
      );

      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual("Sku not found !");

      done();
    });
  });

  describe("Test Delete Sku in Cart", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(true);
      spyOn(fakeSkuRepository, "get").and.returnValue(true);
      spyOn(fakeCartRepository, "getQuantitySkuInCart").and.returnValue(2);
      spyOn(fakeCartRepository, "deleteSkuInCart");
      spyOn(fakeSkuRepository, "updateInventory");
    });
    it("should get message successfully", async (done) => {
      const deleteProductCart = new DeleteProductUseCase(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await deleteProductCart.execute(
        payloadValidCart.cartId,
        payloadValidCart.skuId
      );

      expect(response.statusCode).toEqual(200);
      expect(response.message).toEqual("Sku deleted successfully!");

      done();
    });
  });
});
