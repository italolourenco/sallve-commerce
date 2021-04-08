export interface ISkuRepository {
  get(skuId: number);
  updateInventory(skuId: number, inventory: number);
}
