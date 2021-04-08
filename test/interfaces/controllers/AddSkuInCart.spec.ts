import { AddSkuInCart } from "../../../src/application/use_cases/AddSkuInCart";
import { ICartRepository } from "../../../src/domain/ICartRepository";
import { ISkuRepository } from "../../../src/domain/ISkuRepository";
import { ICacheManager } from "../../../src/infrastructure/cache/ICacheManager";
import AddProductCart from "../../../src/interfaces/controllers/AddProductCart";

const fakeCartRepository = {
  //
} as ICartRepository;

const fakeProductRepository = {
  //
} as ISkuRepository;

const fakeCacheManager = {
  //
} as ICacheManager;

const request = {
  params: {
    cartId: 1,
  },
  body: {
    sku: "11",
    quantity: 1,
  },
} as any;

describe("Test Add Sku Cart Controller", () => {
  beforeEach(() => {
    spyOn(AddSkuInCart.prototype, "execute").and.returnValue({});
  });
  it("should call Add Product Cart use case", async (done) => {
    const addSkuInCart = new AddSkuInCart(
      fakeCartRepository,
      fakeProductRepository
    );
    const addProductCartController = new AddProductCart(
      addSkuInCart,
      fakeCacheManager
    );
    await addProductCartController.handle(request);

    expect(AddSkuInCart.prototype.execute).toBeCalledWith(
      request.params.cartId,
      request.body.sku,
      request.body.quantity
    );
    done();
  });
});
