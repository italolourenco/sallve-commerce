import { GetCartUseCase } from "../../../src/application/use_cases/GetCartUseCase";
import { ICartRepository } from "../../../src/domain/ICartRepository";
import { IProductRepository } from "../../../src/domain/IProductRepository";
import { ISkuRepository } from "../../../src/domain/ISkuRepository";
import { ICacheManager } from "../../../src/infrastructure/cache/ICacheManager";
import GetCartController from "../../../src/interfaces/controllers/GetCartController";

const fakeCartRepository = {
  //
} as ICartRepository;

const fakeProductRepository = {
  //
} as IProductRepository;

const fakeCacheManager = {
  get: (key) => {
    //
  },
  set: (key, value) => {
    //
  },
} as ICacheManager;

const request = {
  params: {
    cartId: 1,
  },
} as any;

describe("Test Get Cart Controller", () => {
  beforeEach(() => {
    spyOn(GetCartUseCase.prototype, "execute").and.returnValue({});
    spyOn(fakeCacheManager, "get").and.returnValue(false);
    spyOn(fakeCacheManager, "set");
  });
  it("should call Get Cart use case", async (done) => {
    const getCartUseCase = new GetCartUseCase(
      fakeCartRepository,
      fakeProductRepository
    );
    const getCartController = new GetCartController(
      getCartUseCase,
      fakeCacheManager
    );
    await getCartController.handle(request);

    expect(GetCartUseCase.prototype.execute).toBeCalledWith(
      request.params.cartId
    );
    done();
  });
});
