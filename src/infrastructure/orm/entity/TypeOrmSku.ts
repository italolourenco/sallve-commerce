import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Product } from "./TypeOrmProduct";

@Entity()
export class Sku {
  @PrimaryGeneratedColumn()
  sku: number;

  @Column()
  inventory: number;

  @Column()
  price: string;

  @ManyToOne(() => Product, (product) => product.skus)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
