'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  Category.init(
    {
      displayName: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      description: DataTypes.TEXT('tiny'),
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};
