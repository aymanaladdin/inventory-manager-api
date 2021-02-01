import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) throw new Error("Couldn't find .env file");

export * from './api';
export * from './knex';
export * from './mysql';
export * from './logger';
