import { nanoid } from 'nanoid';
import { IProduct, IProductDetailsOptions, IProductListOptions } from "./interfaces";
import { ProductRepository } from "./product.repository";

export class ProductService {
  constructor(private productRepository: ProductRepository) { }

  public listProducts(options?: IProductListOptions): Promise<IProduct[]> {
    return this.productRepository.listProducts(options);
  }

  public getProduct(key: string, options: IProductDetailsOptions): Promise<IProduct> {

    return this.productRepository.getProduct(key, options);
  }

  public async createNewProduct(productInfo: Omit<IProduct, 'key'>): Promise<{ key: string; }> {
    const key = nanoid(10);
    await this.productRepository.createNewProduct(Object.assign(productInfo, { key }));

    return { key };
  }
}
