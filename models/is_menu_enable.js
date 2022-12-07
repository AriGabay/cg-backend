'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IsMenuEnable extends Model {
    static associate() {}
  }
  IsMenuEnable.init(
    {
      enable: DataTypes.BOOLEAN,
      menuType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'IsMenuEnable',
    }
  );
  return IsMenuEnable;
};
