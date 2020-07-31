import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    // criando a query com nome, preço e quantidade.
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    // jogando a query no banco de dados pra salvar os valores
    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    // procurando pelo produto que possua o nome informado
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // criando um array de produtos
    const idList = products.map(product => product.id);
    // procurando todos os produtos com o array de id
    const orderList = await this.ormRepository.find({ id: In(idList) });

    // se a quantidade que eu tinha, for diferente da que eu achei
    if (idList.length !== orderList.length) {
      throw new AppError('Missing products');
    }

    return orderList;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsData = await this.findAllById(products);

    // pegando os produtos com os mesmos ids
    const newProducts = productsData.map(productData => {
      const productFind = products.find(
        product => product.id === productData.id,
      );
      // caso o produto não seja encontrado...
      if (!productFind) {
        throw new AppError('Product not find');
      }

      if (
        productData.quantity < productFind.quantity ||
        productFind.quantity < 1
      ) {
        throw new AppError('Insufficient product quantity');
      }
      // passando os produtos mapeados
      const newProduct = productData;

      // retirando -1 da quantidade
      newProduct.quantity -= productFind.quantity;

      return newProduct;
    });

    // salvando os novos produtos.
    await this.ormRepository.save(newProducts);

    return newProducts;
  }
}

export default ProductsRepository;
