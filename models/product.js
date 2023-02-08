'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Price, {
        foreignKey: 'priceId',
        onDelete: 'CASCADE',
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init(
    {
      displayName: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      inStock: DataTypes.BOOLEAN,
      imgUrl: DataTypes.STRING,
      description: DataTypes.TEXT('tiny'),
      priceId: DataTypes.INTEGER,
      kitniyot: DataTypes.BOOLEAN,
      isMenuPesach: DataTypes.BOOLEAN,
      isMenuTishray: DataTypes.BOOLEAN,
      isMenuWeekend: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );
  return Product;
};
