'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SizePrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  );
  return SizePrice;
};
