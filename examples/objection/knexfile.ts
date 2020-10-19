require('ts-node/register');

const dotenv = require('dotenv')

dotenv.config()

console.log(__dirname, __filename)

export default {
  client: 'pg',
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
  },
  pool: {
    min: 2,
    max: 10
  },
  searchPath: ['knex', 'public'],
  migrations: {
    directory: './migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: './seeds',
  }
};
