import { Sku } from "./Sku";

export class Product {
  id: number;
  name: string;
  image: string;
  skus: Sku[];
}
