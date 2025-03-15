'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbGannayEyalon = {};
const dotenv = require('dotenv');
dotenv.config();

let options;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
let sequelize;
if (
  process.env.NODE_ENV &&
  !!process.env.NODE_ENV.length &&
  process.env.NODE_ENV.toLowerCase() === 'development'
) {
  options = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    charset: 'utf8',
    dialectOptions: {
      ssl: Boolean(Number(process.env.USE_SSL)),
      charset: 'utf8',
      collate: 'utf8_general_ci',
      allowPublicKeyRetrieval: true,
    },
  };
  sequelize = new Sequelize(
    `mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3307/${process.env.DB_NAME_ONLINE_MENU}`,
    { ...options }
  );
} else {
  options = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    charset: 'utf8',
    dialectOptions: {
      ssl: Boolean(Number(process.env.USE_SSL)),
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  };
  sequelize = new Sequelize(
    `mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_ONLINE_MENU}`,
    { ...options }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    if (path.join(__dirname, file).includes('local-index.js')) return;
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    dbGannayEyalon[model.name] = model;
  });

Object.keys(dbGannayEyalon).forEach((modelName) => {
  if (dbGannayEyalon[modelName].associate) {
    dbGannayEyalon[modelName].associate(dbGannayEyalon);
  }
});

dbGannayEyalon.sequelize = sequelize;
dbGannayEyalon.Sequelize = Sequelize;
//
module.exports = dbGannayEyalon;
