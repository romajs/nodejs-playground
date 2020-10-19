import Company from './models/Company';
import { knex } from './db'

async function main() {
  const companies = await Company.query()
  console.log({ companies })
}

main()
  .then(() => knex.destroy())
  .catch(err => {
    console.error(err);
    return knex.destroy();
  });
