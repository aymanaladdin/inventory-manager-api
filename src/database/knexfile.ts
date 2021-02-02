require('ts-node/register');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: '12345',
      database: 'inventory_manager'
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
      loadExtensions: ['.ts']
    },
    seeds: {
      directory: './seeds',
      extension: 'ts',
      loadExtensions: ['.ts']
    }
  },
  testing: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: '12345',
      database: 'inventory_manager'
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
      loadExtensions: ['.ts']
    },
    seeds: {
      directory: './seeds',
      extension: 'ts',
      loadExtensions: ['.ts']
    }
  }
};
