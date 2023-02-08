'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SizePrice extends Model {
    static associate(models) {
      SizePrice.belongsTo(models.Price, {
        foreignKey: 'priceId',
        onDelete: 'CASCADE',
      });
    }
  }
  SizePrice.init(
    {
      size: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      priceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SizePrice',
      tableName: 'sizeprices',
    }
  );
  return SizePrice;
};
