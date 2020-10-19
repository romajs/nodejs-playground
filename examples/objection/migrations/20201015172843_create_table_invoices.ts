import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('invoices', table => {
    table.increments('id').primary();
    table.timestamp('date').notNullable();
    table.date('date_due').notNullable();
    table.float('amount').notNullable();
    table.boolean('paid').notNullable();
    table.integer('invoice_no').notNullable();
    table.integer('payment_receipt_id').notNullable();
    table.integer('portfolio_id').notNullable().references('portfolios.id');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('invoices')
}
