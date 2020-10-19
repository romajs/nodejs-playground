import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('companies', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('portfolio_id').notNullable().references('portfolios.id');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('companies')
}
