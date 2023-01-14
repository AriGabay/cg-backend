'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryGn extends Model {
    static associate(models) {
      CategoryGn.hasMany(models.ProductGn, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  CategoryGn.init(
    {
      displayName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CategoryGn',
    }
  );

  return CategoryGn;
};
