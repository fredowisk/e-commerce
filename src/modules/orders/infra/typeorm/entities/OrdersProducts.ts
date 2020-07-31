import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // a coluna que está referenciando é a order_id
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // a coluna que está referenciando é a product_id
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // esta aqui
  @Column()
  product_id: string;

  // esta aqui
  @Column()
  order_id: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
