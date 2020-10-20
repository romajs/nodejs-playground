import BaseModel from "./BaseModel";
import { Model } from "objection";
import Restaurant from "./Restaurant";

export default class User extends BaseModel {
  name?: String;
  email?: String;
  phone?: String;
  firstName?: String;
  lastName?: String;
  encryptedPassword?: String;
  passwordResetToken?: String;
  timezone?: String;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      // TODO:
    };
  }

  static get relationMappings() {
    return {
      restaurant: {
        relation: Model.ManyToManyRelation,
        modelClass: Restaurant,
        join: {
          from: 'users.id',
          throught: {
            from: 'users_restaurants.user_id',
            to: 'users_restaurants.restaurant_id',
            extra: ['role']
          },
          to: 'restaurants.id'
        }
      }
    };
  }
}

module.exports = User
