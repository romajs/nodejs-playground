import BaseModel from './BaseModel';
import { Model } from 'objection'
import Portfolio from './Portfolio';

export default class Company extends BaseModel {
  name?: String;
  portfolioId?: Number;

  constructor(name?: String, portfolioId?: Number) {
    super()
    this.name = name
    this.portfolioId = portfolioId
  }

  static get tableName() {
    return 'companies';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'portfolioId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        portfolioId: { type: 'integer' },
      }
    };
  }

  static get relationMappings() {
    return {
      invoice: {
        relation: Model.BelongsToOneRelation,
        modelClass: Portfolio,
        join: {
          from: 'companies.portfolioId',
          to: 'portfolios.id'
        }
      }
    };
  }
}

module.exports = Company
