import { Model, snakeCaseMappers } from 'objection'

import Invoice from './Invoice'

export default class Portfolio extends Model {
  id?: Number;
  name?: String;

  constructor(name?: String) {
    super()
    this.name = name
  }

  static get tableName() {
    return 'portfolios';
  }

  static columnNameMappers = snakeCaseMappers();

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      invoice: {
        relation: Model.BelongsToOneRelation,
        modelClass: Invoice,
        join: {
          from: 'portfolios.invoiceId',
          to: 'invoice.id'
        }
      }
    };
  }
}
