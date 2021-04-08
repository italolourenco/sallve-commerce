import { Product } from "./Product";
import { SkuResponse } from "./SkuResponse";

export class ProductResponse {
  id: number;
  skus?: SkuResponse[];

  constructor() {}
}
