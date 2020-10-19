import { Model, snakeCaseMappers } from 'objection'

export default class Invoice extends Model {
  id?: BigInteger;
  date?: Date;
  dateDue?: Date;
  amount?: Number;
  paid?: boolean;
  invoiceNo?: Number
  paymentReceiptId?: Number
  portfolioId?: Number

  static get tableName() {
    return 'invoices';
  }

  static columnNameMappers = snakeCaseMappers();

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['date', 'date_due', 'amount', 'paid', 'invoiceNo', 'paymentReceiptId', 'portfolioId'],
      properties: {
        id: { type: 'integer' },
        date: { type: 'timestamp' },
        date_due: { type: 'date' },
        amount: { type: 'float' },
        paid: { type: 'boolean' },
        invoiceNo: { type: 'integer' },
        paymentReceiptId: { type: 'integer' },
        portfolioId: { type: 'integer' },
      }
    };
  }
}
