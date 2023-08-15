'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbGannayEyalon = {};
const dotenv = require('dotenv');
dotenv.config();

const envVars = Object.keys(process.env)
  .filter((key) => key.includes('DB_'))
  .map((key) => `${key}:${process.env[key]};`)
  .reduce((lastVal, currVal) => lastVal + currVal, '');
console.log(envVars);
const sequelize = new Sequelize(
  process.env.DB_NAME_ONLINE_MENU,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: 3307,
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
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    if (path.join(__dirname, file).includes('index.js')) return;

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

module.exports = dbGannayEyalon;
