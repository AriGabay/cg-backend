'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductGn extends Model {
    static associate(models) {
      ProductGn.belongsTo(models.CategoryGn, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  ProductGn.init(
    {
      productName: DataTypes.STRING,
      description: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      autoAdd: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      photos: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'ProductGn',
      tableName: 'productgns',
    }
  );
  return ProductGn;
};
