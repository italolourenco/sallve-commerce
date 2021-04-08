import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Sku } from "./TypeOrmSku";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => Sku)
  @JoinTable({
    name: "cart_skus",
    joinColumn: {
      name: "cart_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "sku_id",
      referencedColumnName: "sku",
    },
  })
  skus!: Sku[];
}
