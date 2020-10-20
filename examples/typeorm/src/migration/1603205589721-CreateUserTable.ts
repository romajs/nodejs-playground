import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const ID_COLUMN = new TableColumn({
  name: 'id',
  type: 'int',
  isPrimary: true,
  isGenerated: true,
  generationStrategy: 'increment',
});

const CREATED_AT_COLUMN = new TableColumn({
  name: 'created_at',
  type: 'timestamp',
  isNullable: false,
  default: 'CURRENT_TIMESTAMP',
});

const UPDATED_AT_COLUMN = new TableColumn({
  name: 'updated_at',
  type: 'timestamp',
  isNullable: false,
  default: 'CURRENT_TIMESTAMP',
});

const BASE_COLUMNS = [ID_COLUMN, CREATED_AT_COLUMN, UPDATED_AT_COLUMN];

const DATE_COLUMNS = [CREATED_AT_COLUMN, UPDATED_AT_COLUMN];

export class CreateUserTable1603205589721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoices',
        columns: [
          ...BASE_COLUMNS,
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'date', type: 'date', isNullable: false },
          { name: 'date_due', type: 'date', isNullable: false },
          { name: 'amount', type: 'float', isNullable: false },
          { name: 'paid', type: 'boolean', isNullable: false },
          { name: 'invoice_no', type: 'int', isNullable: false },
          { name: 'payment_receipt_id', type: 'int', isNullable: false },
        ],
      }),
      true
    );
    await queryRunner.createTable(
      new Table({
        name: 'portfolios',
        columns: [
          ...BASE_COLUMNS,
          { name: 'name', type: 'varchar', isNullable: false },
        ],
      }),
      true
    );
    await queryRunner.createTable(
      new Table({
        name: 'portfolios_invoices',
        columns: [
          ...DATE_COLUMNS,
          { name: 'invoice_id', type: 'int', isNullable: false },
          { name: 'portfolio_id', type: 'int', isNullable: false },
        ],
      }),
      true
    );
    await queryRunner.createForeignKey(
      'portfolios_invoices',
      new TableForeignKey({
        name: 'fk_portfolios_invoices_invoice_id',
        columnNames: ['invoice_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'invoices',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'portfolios_invoices',
      new TableForeignKey({
        name: 'fk_portfolios_invoices_portfolio_id',
        columnNames: ['portfolio_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'portfolios',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...BASE_COLUMNS,
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'age', type: 'int', isNullable: false },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true, true, true);
    await queryRunner.dropTable('portfolios_invoices', true, true, true);
    await queryRunner.dropTable('portfolios', true, true, true);
    await queryRunner.dropTable('invoices', true, true, true);
  }
}
