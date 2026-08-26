'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteSetting extends Model {
    static associate() {}
  }
  SiteSetting.init(
    {
      // Free-form key/value so the admin can be given control of a piece of
      // copy without a schema change each time. Deliberately a NEW table
      // rather than a column on `ismenuenables`: server.js runs a plain
      // `sequelize.sync()`, which creates missing tables but does not ALTER
      // existing ones, so a new table appears on deploy while a new column
      // would silently never be added.
      key: { type: DataTypes.STRING, unique: true },
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'SiteSetting',
      tableName: 'sitesettings',
    }
  );
  return SiteSetting;
};
