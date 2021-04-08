import { Sku } from "./Sku";

export class Cart {
  id: number;
  skus: Sku[];

  constructor(id: number, skus?) {
    this.id = id;
    this.skus = skus;
  }
}
