import BaseModel from './BaseModel';

export default class Invoice extends BaseModel {
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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['date', 'date_due', 'amount', 'paid', 'invoiceNo', 'paymentReceiptId', 'portfolioId'],
      properties: {
        id: { type: 'integer' },
        date: { type: 'string', format: 'date-time' },
        date_due: { type: 'string', format: 'date-time' },
        amount: { type: 'number' },
        paid: { type: 'boolean' },
        invoiceNo: { type: 'integer' },
        paymentReceiptId: { type: 'integer' },
        portfolioId: { type: 'integer' },
      }
    };
  }
}
