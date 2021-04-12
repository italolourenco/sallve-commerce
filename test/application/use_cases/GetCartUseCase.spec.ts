import { GetCartUseCase } from "../../../src/application/use_cases/GetCartUseCase";
import { ICartRepository } from "../../../src/domain/ICartRepository";
import { IProductRepository } from "../../../src/domain/IProductRepository";

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
} as ICartRepository;

const cartResponse = {
  id: 1,
  skus: [],
};

const fakeProductRepository = {
  getProductBySku: () => {
    //
  },

  listAllProducrs: () => {
    //
  },
} as IProductRepository;

const cartId = 1;

const cartResponseWithSkus = {
  id: 1,
  skus: [
    {
      sku: 1,
      inventory: 2,
      price: 10.5,
    },
    {
      sku: 4,
      inventory: 5,
      price: 5,
    },
  ],
};

const newCartId = 3;

const newCartResponse = {
  id: 3,
  skus: [],
};

const productData = {
  id: 2,
  name: "productNameValue",
  image: "productImageUrlValue",
};

describe("Test GetCartUseCase", () => {
  describe("Test get empty cart", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(cartResponse);
    });
    it("should get empty cart with successfully", async (done) => {
      const getCartUseCase = new GetCartUseCase(
        fakeCartRepository,
        fakeProductRepository
      );

      const response = await getCartUseCase.execute(cartId);
      expect(response.id).toEqual(cartId);
      expect(response.products).toEqual([]);
      expect(response.totalCart).toEqual(0.0);
      expect(response.totalSkus).toEqual(0);

      done();
    });
  });

  describe("Test get cart with values", () => {
    beforeEach(() => {
      spyOn(fakeCartRepository, "get").and.returnValue(cartResponseWithSkus);
      spyOn(fakeCartRepository, "getQuantitySkuInCart").and.returnValues([
        1,
        2,
      ]);
      spyOn(fakeProductRepository, "getProductBySku").and.returnValue(
        productData
      );
    });
    it("should get cart skus", async (done) => {
      const getCartUseCase = new GetCartUseCase(
        fakeCartRepository,
        fakeProductRepository
      );

      const response = await getCartUseCase.execute(cartId);
      expect(response.id).toEqual(cartId);
      expect(response.totalCart).toEqual(15.5);
      expect(response.totalSkus).toEqual(2);
      done();
    });
  });
});
