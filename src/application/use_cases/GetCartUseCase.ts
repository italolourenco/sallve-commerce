import { ICartRepository } from "../../domain/ICartRepository";
import { IProductRepository } from "../../domain/IProductRepository";
import { Cart } from "../../domain/models/Cart";
import { CartResponse } from "../../domain/models/CartResponse";
import { Sku } from "../../domain/models/Sku";
import { SkuResponse } from "../../domain/models/SkuResponse";

export class GetCartUseCase {
  constructor(
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(cartId) {
    try {
      const cart = await this.cartRepository.get(cartId);
      return this.parseCartToCartResponse(cart);
    } catch (error) {
      console.log(error);
      return { statusCode: 404, message: error.message };
    }
  }

  private async parseCartToCartResponse(cart: Cart): Promise<CartResponse> {
    const { skus } = cart;

    const cartResponse = new CartResponse(cart.id);
    cartResponse.products = [];

    if (!(skus?.length > 0)) {
      cartResponse.totalCart = 0.0;
      cartResponse.totalSkus = 0;

      return cartResponse;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const sku of skus) {
      // eslint-disable-next-line no-await-in-loop
      const skuId = sku.sku;
      const quatitySkuInCart = await this.cartRepository.getQuantitySkuInCart(
        cart.id,
        skuId
      );

      // eslint-disable-next-line no-await-in-loop
      const productData = await this.productRepository.getProductBySku(skuId);

      const skuResponse = new SkuResponse(
        sku.sku,
        quatitySkuInCart,
        sku.price,
        quatitySkuInCart * sku.price
      );

      const isProductInCart = cartResponse.products.findIndex(
        (product) => product.id === productData.id
      );

      if (isProductInCart !== -1) {
        // const skuResponse = new SkuResponse()
        cartResponse.products[isProductInCart].skus.push(skuResponse);
      } else {
        productData.skus = [skuResponse];
        cartResponse.products.push(productData);
      }
    }

    cartResponse.totalCart = this.calcTotalCart(skus);
    cartResponse.totalSkus = skus.length;

    return cartResponse;
  }

  private calcTotalCart(skus: Sku[]): number {
    let totalCart = 0.0;

    skus.forEach((sku) => {
      totalCart += sku.price;
    });

    return totalCart;
  }
}
