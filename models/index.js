// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const db = {};
// const dotenv = require('dotenv');
// dotenv.config();
// let options;
// let sequelize;
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// if (
//   process.env.NODE_ENV &&
//   !!process.env.NODE_ENV.length &&
//   process.env.NODE_ENV.toLowerCase() === 'development'
// ) {
//   options = {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     define: {
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//     },
//     charset: 'utf8',
//     dialectOptions: {
//       ssl: Boolean(Number(process.env.USE_SSL)),
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//       allowPublicKeyRetrieval: true,
//     },
//   };
//   sequelize = new Sequelize(
//     `mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3307/${process.env.DB_NAME}`,
//     { ...options }
//   );
// } else {
//   options = {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     define: {
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//     },
//     charset: 'utf8',
//     dialectOptions: {
//       ssl: Boolean(Number(process.env.USE_SSL)),
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//     },
//   };
//   sequelize = new Sequelize(
//     `mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
//     { ...options }
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     console.log('path.join(__dirname, file)', path.join(__dirname, file));
//     if (path.join(__dirname, file).includes('local-index.js')) return;
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

'use strict';

/**
 * ✅ Sequelize v6 + MariaDB (official driver)
 * ✅ Fully compatible with Azure Database for MySQL (Flexible Server)
 * ✅ Includes utf8mb4 encoding for Hebrew/English
 * ✅ Supports SSL/TLS 1.2 (required by Azure)
 */

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);
const db = {};

// קבע האם מדובר בסביבת פיתוח או הפקה
// const isDev = (process.env.NODE_ENV || '').toLowerCase() === 'development';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

// הגדרות כלליות ל־Sequelize
const baseOptions = {
  host: process.env.DB_HOST, // לדוגמה: cg-prod-db.mysql.database.azure.com
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mariadb',
  dialectModule: require('mariadb'),
  logging: false,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl:
      process.env.USE_SSL && process.env.USE_SSL.toString() === '1'
        ? { minVersion: 'TLSv1.2' }
        : undefined,
  },
};

// בנה URI בטוח
const uri = `mariadb://${encodeURIComponent(
  process.env.DB_USERNAME
)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${
  process.env.DB_PORT
}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(uri, baseOptions);

// 🚀 טען את כל המודלים בתיקיית models
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js')
  )
  .forEach((file) => {
    const fullPath = path.join(__dirname, file);
    if (fullPath.includes('local-index.js')) return;
    console.log('📁 Loading model:', fullPath);
    const model = require(fullPath)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// קשרים בין מודלים
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// הוסף את החיבור ל־DB לאובייקט הייצוא
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
