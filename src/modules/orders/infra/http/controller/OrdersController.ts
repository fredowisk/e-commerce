import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  // exibindo as orderns
  public async show(request: Request, response: Response): Promise<Response> {
    // pegando o id
    const { id } = request.params;

    // injetando a classe
    const showOrder = container.resolve(FindOrderService);

    // procurando pelo id informado
    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
