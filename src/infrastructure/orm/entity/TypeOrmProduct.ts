import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Sku } from "./TypeOrmSku";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Sku, (sku) => sku.product)
  skus: Sku[];
}
