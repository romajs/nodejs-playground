import * as Knex from 'knex';

import Company from "../src/models/Company"
import Portfolio from "../src/models/Portfolio"

export const seed = async function(knex: Knex) {
  const portfolio = new Portfolio('Porfolio P1')
  await Portfolio.query(knex).insert(portfolio);

  const company = new Company('Company C1', portfolio.id)
  await Company.query(knex).insert(company);
};
