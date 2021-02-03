import * as Knex from 'knex';
import faker from 'faker';
import { nanoid } from 'nanoid';
import { tables } from '../schemas.enum';

import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

function getPassword() {
  const salt = bcrypt.genSaltSync(SALT_FACTOR)

  return bcrypt.hashSync('12345678', salt);
}

const usersData = [
  { id: 1, key: nanoid(10), name: 'user admin', email: faker.internet.email(), password: getPassword() }
];

const productsData = [];

for (let i = 0; i < 200; i++) {
  productsData.push({
    key: nanoid(10),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.product(),
    quantity: faker.random.number(),
    creator: usersData[Math.floor(Math.random() * Math.floor(usersData.length))].key
  })
}


export async function seed(knex: Knex): Promise<void> {
  await knex(tables.user).del();
  await knex(tables.product).del();

  await knex(tables.user).insert(usersData);
  await knex(tables.product).insert(productsData);
}



