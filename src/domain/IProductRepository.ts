export interface IProductRepository {
  getProductBySku(skuId: number);
  listAllProducrs();
}
