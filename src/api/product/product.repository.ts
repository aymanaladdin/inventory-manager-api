import Knex from 'knex';
import { IProduct, IProductDetailsOptions, IProductListOptions } from './interfaces';
export class ProductRepository {
  private tableName: string;

  constructor(private knexClient: Knex) {
    this.tableName = 'product'
  }

  public listProducts({ filter, limit, offset, sorting }: IProductListOptions): Promise<IProduct[]> {

    const query = this.knexClient.from(this.tableName).select();

    if (filter?.category) query.where({ category: filter?.category });
    if (filter?.name) query.andWhereRaw('`product`.`name` like ?', [`%${filter?.name}%`]);
    if (filter?.description) query.andWhereRaw('`product`.`description` like ?', [`%${filter.description}%`]);

    return query
      .orderBy(sorting || [{ column: 'createdAt', order: 'desc' }])
      .limit(limit || 10)
      .offset(offset || 0);
  }

  public getProduct(key: string, { creator }: IProductDetailsOptions): Promise<IProduct> {

    return this.knexClient.from(this.tableName).first().where({ key }).andWhere(creator ? { creator } : {});
  }

  public createNewProduct(product: IProduct): Promise<void> {

    return this.knexClient.into(this.tableName).insert(product);
  }
}
