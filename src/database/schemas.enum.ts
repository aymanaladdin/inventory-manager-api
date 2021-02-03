export enum tables {
  user = 'user',
  product = 'product',
  token = 'token'
}

export enum product {
  id = 'id',
  key = 'key',
  name = 'name',
  price = 'price',
  description = 'description',
  category = 'category',
  quantity = 'quantity',
  creator = 'creator',
  pictureUrl = 'pictureUrl',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum user {
  id = 'id',
  key = 'key',
  name = 'name',
  email = 'email',
  password = 'password',
}

export enum token {
  user = 'user',
  activeAccessToken = 'activeAccessToken',
  activeRefreshToken = 'activeRefreshToken',
}

export enum timestamps {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt'
}
