import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  // o constructor será executado assim que o repositório for carregado.
  constructor() {
    // o getRepository cria um repositorio, enquanto o getCustomRepository pega um que já existe.
    this.ormRepository = getRepository(Customer);
  }

  // Ele irá criar o customer, por isso colocamos ele como parametro na Promise.
  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    // criando uma query no typeORM com o nome e o email do customer
    const customer = this.ormRepository.create({
      name,
      email,
    });

    // salvando o customer no banco de dados
    await this.ormRepository.save(customer);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    // Se o findOne receber apenas um parametro como string, ele já irá pesquisar pelo ID
    // sem necessidade de utilizar o WHERE
    const findCustomer = await this.ormRepository.findOne(id);

    return findCustomer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    // procurando se existe algum customer com o email informado
    const findCustomer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return findCustomer;
  }
}

export default CustomersRepository;
