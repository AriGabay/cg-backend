'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate() {}
  }
  Order.init(
    {
      order: DataTypes.TEXT('medium'),
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
    }
  );

  return Order;
};
