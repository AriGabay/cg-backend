'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      Price.hasMany(models.SizePrice, {
        foreignKey: 'priceId',
        separate: true,
      });

      Price.hasMany(models.Product, {
        foreignKey: 'priceId',
        onDelete: 'CASCADE',
      });
    }
  }
  Price.init(
    {
      priceType: DataTypes.ENUM('box', 'unit', 'weight'),
      displayName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Price',
      tableName: 'prices',
    }
  );
  return Price;
};
