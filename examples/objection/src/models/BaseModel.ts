import { Model, snakeCaseMappers } from 'objection'

export default class BaseModel extends Model {
  id?: Number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    super()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static columnNameMappers = snakeCaseMappers();
}

module.exports = BaseModel
