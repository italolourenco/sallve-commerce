import { ICartRepository } from "../../domain/ICartRepository";
import { IProductRepository } from "../../domain/IProductRepository";

export class ListProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute() {
    return this.productRepository.listAllProducrs();
  }
}
