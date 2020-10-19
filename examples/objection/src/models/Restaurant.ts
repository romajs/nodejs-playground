import BaseModel from "./BaseModel";

export default class Restaurant extends BaseModel {
  brandId?: Number;
  name?: String;
  phone?: String;
  addressId?: Number;
  deliveryRadius?: Number;
  timezone?: String;
  canDeliver?: Boolean;
  canPickup?: Boolean;
  canCurbside?: Boolean;
  defaultMakeTime?: Date; // TODO:
  defaultDeliveryTime?: Date; // TODO:

  static get tableName() {
    return 'restaurant';
  }
}

module.exports = Restaurant
