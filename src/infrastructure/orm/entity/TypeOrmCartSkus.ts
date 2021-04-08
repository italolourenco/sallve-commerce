import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cart_skus" })
export class TypeOrmCartSkus {
  @Column({ name: "sku_id" })
  @PrimaryColumn()
  sku_id: number;

  @Column({ name: "cart_id" })
  @PrimaryColumn()
  cart_id: number;

  @Column({ name: "quantity" })
  quantity: number;
}
