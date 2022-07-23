'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Price.hasMany(models.SizePrice, {
        foreignKey: 'priceId',
        separate: true // does magic; only with .hasMany associations
      });

      Price.hasMany(models.Product, {
        foreignKey: 'priceId',
        // separate: true, // does magic; only with .hasMany associations
        onDelete: 'CASCADE'
      });
    }
  }
  Price.init(
    {
      priceType: DataTypes.ENUM('box', 'unit', 'weight'),
      displayName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Price'
    }
  );
  return Price;
};
