import { Request } from "express";

import { CreateCartUseCase } from "../../application/use_cases/CreateCartUseCase";
import { IController } from "./IController";

class CreateCartController implements IController {
  constructor(private createCartUseCase: CreateCartUseCase) {}

  async handle(request: Request) {
    return this.createCartUseCase.execute();
  }
}

export default CreateCartController;
