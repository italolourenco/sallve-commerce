import { ICartRepository } from "../../domain/ICartRepository";
import { CartResponse } from "../../domain/models/CartResponse";

export class CreateCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute() {
    const emptyCart = await this.cartRepository.create();

    const cartResponse = new CartResponse(emptyCart.id);
    cartResponse.products = [];
    cartResponse.totalCart = 0.0;
    cartResponse.totalSkus = 0;

    return cartResponse;
  }
}
