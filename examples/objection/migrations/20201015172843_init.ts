import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
 await knex.schema
  .createTable('invoices', table => {
      table.increments('id').primary();
      table.dateTime('date').notNullable();
      table.date('date_due').notNullable();
      table.float('amount').notNullable();
      table.boolean('paid').notNullable();
      table.integer('invoice_no').notNullable();
      table.integer('payment_receipt_id').notNullable(); // TODO: .references('payments.id');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('portfolios', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('portfolios_invoices', table => {
      table.integer('portfolio_id').notNullable().references('portfolios.id');
      table.integer('invoice_id').notNullable().references('invoices.id');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('companies', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('portfolio_id').notNullable().references('portfolios.id');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('brands', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('company_id').notNullable().references('companies.id');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('role', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.string('firstName').notNullable();
      table.string('lastName');
      table.string('encryptedPassword').notNullable();
      table.string('passwordResetToken');
      table.string('timezone');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('address', table => {
      table.increments('id').primary();
      table.string('address').notNullable();
      table.string('address2').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('country').notNullable();
      table.string('postal_code').notNullable();
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('cuisines', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('restaurants', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.integer('brand_id').notNullable().references('brands.id');
      table.integer('address_id').notNullable().references('portfolios.id');
      table.float('delivery_radius');
      table.boolean('can_deliver');
      table.boolean('can_pickup');
      table.boolean('can_curbside');
      // TODO: default_make_time
      // TODO: default_delivery_time
      table.string('timezone');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('restaurants_calendars', table => {
      table.increments('id').primary();
      table.integer('restaurant_id').notNullable().references('restaurants.id');
      table.date('date_start').notNullable();
      table.date('date_end').notNullable();
      table.boolean('handoff_mode').notNullable();
      table.boolean('days_of_week').notNullable();
      table.integer('time_start').notNullable();
      table.integer('time_end').notNullable();
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('restaurants_cuisines', table => {
      table.integer('cuisine_id').notNullable().references('cuisines.id');
      table.integer('restaurant_id').notNullable().references('restaurants.id');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('restaurants_infos', table => {
      table.integer('id').primary().references('restaurants.id'); // FIXME: FK primary key
      table.string('description');
      table.string('instagram_username');
      table.string('instagram_oauth_token');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
    .createTable('restaurants_users', table => {
      table.integer('user_id').notNullable().references('users.id');
      table.integer('restaurant_id').notNullable().references('restaurants.id');
      table.integer('role_id').notNullable().references('role.id');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
    })
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema
    .dropTableIfExists('restaurants_users')
    .dropTableIfExists('restaurants_infos')
    .dropTableIfExists('restaurants_cuisines')
    .dropTableIfExists('restaurants_calendars')
    .dropTableIfExists('restaurants')
    .dropTableIfExists('cuisines')
    .dropTableIfExists('address')
    .dropTableIfExists('users')
    .dropTableIfExists('role')
    .dropTableIfExists('brands')
    .dropTableIfExists('companies')
    .dropTableIfExists('portfolios_invoices')
    .dropTableIfExists('invoices')
    .dropTableIfExists('portfolios')
}
