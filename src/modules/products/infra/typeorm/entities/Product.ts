import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // definindo como tipo numerico, com a precisão de 10 numeros antes da virgula, e 2 depois
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column('integer')
  quantity: number;

  // referenciando a coluna product dentro de orders-products
  @OneToMany(() => OrdersProducts, order => order.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
