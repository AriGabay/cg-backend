'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: true,
  },
});
console.log('sequelize:', sequelize);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
console.log('Step 2');

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log('Step 3');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('Step 4');

console.log('db:', db);
module.exports = db;
