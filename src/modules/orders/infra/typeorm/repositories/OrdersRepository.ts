import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    // criando a query
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    // salvando no banco
    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    // Se o findOne receber apenas um parametro como string, ele já irá pesquisar pelo ID
    // sem necessidade de utilizar o WHERE
    const order = await this.ormRepository.findOne(id);

    return order;
  }
}

export default OrdersRepository;
