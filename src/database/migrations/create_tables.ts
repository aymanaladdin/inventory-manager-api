import * as Knex from 'knex';
import {
  tables,
  product,
  user,
  timestamps,
  token
} from '../schemas.enum';


function addTimeStamps(knex: Knex, table: Knex.CreateTableBuilder) {
  table.timestamp(timestamps.createdAt).defaultTo(knex.fn.now());
  table.timestamp(timestamps.updatedAt).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
}

function createUserTable(knex: Knex, table: Knex.CreateTableBuilder) {
  table.increments(user.id).unsigned();
  table.string(user.key, 10).notNullable().unique();
  table.string(user.name, 75).notNullable().unique();
  table.string(user.email, 320).notNullable().unique();
  table.string(user.password, 60).notNullable().unique();

  addTimeStamps(knex, table);
}

function createTokenTable(knex: Knex, table: Knex.CreateTableBuilder) {
  table.string(token.user, 10).notNullable();
  table.string(token.activeAccessToken, 15).unique();
  table.string(token.activeRefreshToken, 15).unique();

  table.foreign(token.user).references(user.key).inTable(tables.user);

  addTimeStamps(knex, table);
}


function createProductTable(knex: Knex, table: Knex.CreateTableBuilder) {
  table.increments(product.id).unsigned();
  table.string(product.name, 75).notNullable();
  table.string(product.key, 10).notNullable().unique();
  table.text(product.description);
  table.string(product.category, 75);
  table.decimal(product.price, 8, 2).unsigned();
  table.integer(product.quantity).unsigned();
  table.string(product.creator, 10).notNullable();

  table.foreign(product.creator).references(user.key).inTable(tables.user);

  addTimeStamps(knex, table);
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tables.user, (t) => createUserTable(knex, t))
    .createTable(tables.product, (t) => createProductTable(knex, t))
    .createTable(tables.token, (t) => createTokenTable(knex, t))
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(tables.product)
    .dropTable(tables.token)
    .dropTable(tables.user)
}