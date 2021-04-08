import { UpdateSkuInCart } from "../../../src/application/use_cases/UpdateSkuInCart";
import { ICartRepository } from "../../../src/domain/ICartRepository";
import { ISkuRepository } from "../../../src/domain/ISkuRepository";
import { ICacheManager } from "../../../src/infrastructure/cache/ICacheManager";
import UpdateSkuInCartController from "../../../src/interfaces/controllers/UpdateSkuInCartController";

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

describe("Test Update Sku Cart Controller", () => {
  beforeEach(() => {
    spyOn(UpdateSkuInCart.prototype, "execute").and.returnValue({});
  });
  it("should call Update Product Cart use case", async (done) => {
    const updateSkuInCart = new UpdateSkuInCart(
      fakeCartRepository,
      fakeProductRepository
    );
    const updateSkuInCartController = new UpdateSkuInCartController(
      updateSkuInCart,
      fakeCacheManager
    );
    await updateSkuInCartController.handle(request);

    expect(UpdateSkuInCart.prototype.execute).toBeCalledWith(
      request.params.cartId,
      request.body.sku,
      request.body.quantity
    );
    done();
  });
});
