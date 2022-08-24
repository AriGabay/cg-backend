'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IsMenuEnable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
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
