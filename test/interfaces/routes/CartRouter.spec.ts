import {
  ControllerFactory,
  ControllerType,
} from "../../../src/interfaces/controllers/ControllerFactory";
import { CartRouter } from "../../../src/interfaces/routes/CartRouter";

describe("Test case for CartRouter", () => {
  const response = {
    send: () => {
      //
    },
    status: () => {
      //
    },
  } as any;

  describe("Test case for Get Cart router", () => {
    const request = {
      params: {
        cartId: "1",
      },
    } as any;

    const cart = {
      id: 1,
    };

    const GetCartControllerMock = {
      handle: () => {
        //
      },
    } as any;

    beforeEach(() => {
      spyOn(ControllerFactory.prototype, "createController").and.returnValue(
        GetCartControllerMock
      );
      spyOn(GetCartControllerMock, "handle").and.returnValue(cart);
      spyOn(response, "status").and.returnValue(response);
      spyOn(response, "send");
    });

    it("should get cart with succefuul", async (done) => {
      const cartRouter = new CartRouter();
      await cartRouter.getCart(request, response);
      expect(ControllerFactory.prototype.createController).toHaveBeenCalledWith(
        ControllerType.GET_CART
      );
      expect(GetCartControllerMock.handle).toHaveBeenCalledWith(request);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(cart);
      done();
    });
  });

  describe("Test case for Add Sku in Cart router", () => {
    const request = {
      params: {
        cartId: "1",
      },
      body: {
        sku: "1",
        quantitty: 1,
      },
    } as any;

    const controllerResponse = {
      statusCode: 200,
      message: "ok!",
    };

    const AddSkuInCartController = {
      handle: () => {
        //
      },
    } as any;

    beforeEach(() => {
      spyOn(ControllerFactory.prototype, "createController").and.returnValue(
        AddSkuInCartController
      );
      spyOn(AddSkuInCartController, "handle").and.returnValue(
        controllerResponse
      );
      spyOn(response, "status").and.returnValue(response);
      spyOn(response, "send");
    });

    it("should add sku in cart with succefuul", async (done) => {
      const cartRouter = new CartRouter();
      await cartRouter.addProduct(request, response);
      expect(ControllerFactory.prototype.createController).toHaveBeenCalledWith(
        ControllerType.ADD_PRODUCT
      );
      expect(AddSkuInCartController.handle).toHaveBeenCalledWith(request);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        message: controllerResponse.message,
      });
      done();
    });
  });

  describe("Test case for Update Sku in Cart router", () => {
    const request = {
      params: {
        cartId: "1",
      },
      body: {
        sku: "1",
        quantitty: 1,
      },
    } as any;

    const controllerResponse = {
      statusCode: 200,
      message: "ok!",
    };

    const UpdateSkuInCartController = {
      handle: () => {
        //
      },
    } as any;

    beforeEach(() => {
      spyOn(ControllerFactory.prototype, "createController").and.returnValue(
        UpdateSkuInCartController
      );
      spyOn(UpdateSkuInCartController, "handle").and.returnValue(
        controllerResponse
      );
      spyOn(response, "status").and.returnValue(response);
      spyOn(response, "send");
    });

    it("should update sku in cart with succefuul", async (done) => {
      const cartRouter = new CartRouter();
      await cartRouter.updateProduct(request, response);
      expect(ControllerFactory.prototype.createController).toHaveBeenCalledWith(
        ControllerType.UPDATE_PRODUCT
      );
      expect(UpdateSkuInCartController.handle).toHaveBeenCalledWith(request);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        message: controllerResponse.message,
      });
      done();
    });
  });

  describe("Test case for Update Sku in Cart router", () => {
    const request = {
      params: {
        cartId: "1",
        sku: "1",
      },
    } as any;

    const controllerResponse = {
      statusCode: 200,
      message: "ok!",
    };

    const DeleteSkuInCartController = {
      handle: () => {
        //
      },
    } as any;

    beforeEach(() => {
      spyOn(ControllerFactory.prototype, "createController").and.returnValue(
        DeleteSkuInCartController
      );
      spyOn(DeleteSkuInCartController, "handle").and.returnValue(
        controllerResponse
      );
      spyOn(response, "status").and.returnValue(response);
      spyOn(response, "send");
    });

    it("should update sku in cart with succefuul", async (done) => {
      const cartRouter = new CartRouter();
      await cartRouter.deleteProduct(request, response);
      expect(ControllerFactory.prototype.createController).toHaveBeenCalledWith(
        ControllerType.DELETE_PRODUCT
      );
      expect(DeleteSkuInCartController.handle).toHaveBeenCalledWith(request);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        message: controllerResponse.message,
      });
      done();
    });
  });
});
