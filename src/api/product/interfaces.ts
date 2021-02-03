export interface IProduct {
  key: string,
  name: string,
  price: number,
  description: string,
  category: string,
  quantity: number
  createdAt: Date,
  updatedAt: Date,
  creator: string
}

interface IProductSort {
  column: 'key' | 'price' | 'name' | 'description' | 'category' | 'quantity' | 'createdAt' | 'updatedAt',
  order: 'asc' | 'desc'
}

interface IProductFilter extends Partial<Pick<IProduct, 'name' | 'description' | 'category'>> {
  timeRange?: {
    from: Date,
    to: Date
  }
}

export interface IProductListOptions {
  filter?: IProductFilter,
  sorting?: IProductSort[],
  limit?: number,
  offset?: number
}

export interface IProductDetailsOptions {
  creator?: string;
}