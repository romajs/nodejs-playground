import BaseModel from "./BaseModel";

export default class __Example extends BaseModel {
  name?: String;
  portfolioId?: Number;

  static get tableName() {
    return 'companies';
  }
}

module.exports = __Example
