import { AddSkuInCart } from "../../../src/application/use_cases/AddSkuInCart";
import { GetCartUseCase } from "../../../src/application/use_cases/GetCartUseCase";
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
  quantity: 4,
};

const payloadValidCart = {
  cartId: 10,
  skuId: 2,
  quantity: 1,
};

describe("Test Add Sku in Cart Use Case", () => {
  describe("Test get invalid cart", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(false);
    });
    it("should get message error for invalid cart", async (done) => {
      const addSkuInCart = new AddSkuInCart(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await addSkuInCart.execute(
        payloadInvalidCart.cartId,
        payloadInvalidCart.skuId,
        payloadInvalidCart.quantity
      );

      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual("Cart not found !");

      done();
    });
  });

  describe("Test get invalid sku", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(true);
      spyOn(fakeSkuRepository, "get").and.returnValue(false);
    });
    it("should get message error for invalid cart", async (done) => {
      const addSkuInCart = new AddSkuInCart(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await addSkuInCart.execute(
        payloadInvalidCart.cartId,
        payloadInvalidCart.skuId,
        payloadInvalidCart.quantity
      );

      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual("Sku not found !");

      done();
    });
  });

  describe("Test Add Sku in Cart", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(true);
      spyOn(fakeSkuRepository, "get").and.returnValue(true);
      spyOn(fakeCartRepository, "getQuantitySkuInCart").and.returnValue(2);
      spyOn(fakeCartRepository, "setQuantitySkuInCart");
      spyOn(fakeSkuRepository, "updateInventory");
    });
    it("should get message successfully", async (done) => {
      const addSkuInCart = new AddSkuInCart(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await addSkuInCart.execute(
        payloadInvalidCart.cartId,
        payloadInvalidCart.skuId,
        payloadInvalidCart.quantity
      );

      expect(response.statusCode).toEqual(201);
      expect(response.message).toEqual("Sku Added Successfully");

      done();
    });
  });

  describe("Test Add Sku in Cart with sku invalid inventory", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(true);
      spyOn(fakeSkuRepository, "get").and.returnValue(skuData);
      spyOn(fakeCartRepository, "getQuantitySkuInCart").and.returnValue(0);
      spyOn(fakeCartRepository, "addSku");
      spyOn(fakeSkuRepository, "updateInventory");
    });
    it("should get message error", async (done) => {
      const addSkuInCart = new AddSkuInCart(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await addSkuInCart.execute(
        payloadInvalidCart.cartId,
        payloadInvalidCart.skuId,
        payloadInvalidCart.quantity
      );

      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual("Invalid Sku Quantity");

      done();
    });
  });

  describe("Test Add Sku in Cart with sku valid inventory", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(true);
      spyOn(fakeSkuRepository, "get").and.returnValue(skuData);
      spyOn(fakeCartRepository, "getQuantitySkuInCart").and.returnValue(0);
      spyOn(fakeCartRepository, "addSku");
      spyOn(fakeSkuRepository, "updateInventory");
    });
    it("should get add new sku with successfully", async (done) => {
      const addSkuInCart = new AddSkuInCart(
        fakeCartRepository,
        fakeSkuRepository
      );

      const response = await addSkuInCart.execute(
        payloadValidCart.cartId,
        payloadValidCart.skuId,
        payloadValidCart.quantity
      );

      expect(response.statusCode).toEqual(201);
      expect(response.message).toEqual("Sku Added Successfully");

      done();
    });
  });
});
