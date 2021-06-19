'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      priceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};

// price:DataTypes.ENUM(typePrice._id)
