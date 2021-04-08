import { AddSkuInCart } from "../../../src/application/use_cases/AddSkuInCart";
import { DeleteProductUseCase } from "../../../src/application/use_cases/DeleteProductCart";
import { ICartRepository } from "../../../src/domain/ICartRepository";
import { ISkuRepository } from "../../../src/domain/ISkuRepository";
import { ICacheManager } from "../../../src/infrastructure/cache/ICacheManager";
import DeleteSkuController from "../../../src/interfaces/controllers/DeleteSkuController";

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
    sku: 11,
  },
} as any;

describe("Test Delete Sku Cart Controller", () => {
  beforeEach(() => {
    spyOn(DeleteProductUseCase.prototype, "execute").and.returnValue({});
  });
  it("should call Delete Product Cart use case", async (done) => {
    const deleteSkuInCart = new DeleteProductUseCase(
      fakeCartRepository,
      fakeProductRepository
    );
    const deleteSkuInCartController = new DeleteSkuController(
      deleteSkuInCart,
      fakeCacheManager
    );
    await deleteSkuInCartController.handle(request);

    expect(DeleteProductUseCase.prototype.execute).toBeCalledWith(
      request.params.cartId,
      request.params.sku
    );
    done();
  });
});
