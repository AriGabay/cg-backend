'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventDetails extends Model {
    static associate() {}
  }
  EventDetails.init(
    {
      eventDetails: DataTypes.TEXT('long'),
      eventDate: DataTypes.STRING,
      eventInfo: DataTypes.TEXT('long'),
      hashTitle: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      modelName: 'EventDetails',
      tableName: 'eventdetails',
    }
  );

  return EventDetails;
};
