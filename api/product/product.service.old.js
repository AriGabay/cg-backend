const fs = require('fs');
// const { runSQL } = require('../../services/db.service');
const { error } = require('../../services/logger.service');
const DATA_FILE = 'C:/Users/Ari Gabay/code/catering-gabay/data/manu.json';
async function query(filterBy = {}) {
  try {
    // filterBy ? filterBy=filterBy:null
    const namePart = Object.keys(filterBy).length === 0 ? '' : filterBy;
    const query = `SELECT * FROM product  WHERE product.name LIKE '%${namePart}%'`;
    return runSQL(query).then((products) => {
      return products;
    });
  } catch (err) {
    logger.error('cannot find product', err);
    throw err;
  }
}

// async function remove(reviewId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { userId, isAdmin } = store
//         const collection = await dbService.getCollection('review')
//         // remove only if user is owner/admin
//         const query = { _id: ObjectId(reviewId) }
//         if (!isAdmin) query.byUserId = ObjectId(userId)
//         await collection.deleteOne(query)
//         // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
//     } catch (err) {
//         logger.error(`cannot remove review ${reviewId}`, err)
//         throw err
//     }
// }
async function remove(id) {
  try {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) {
        return;
      }
      const dataFile = JSON.parse(data.toString());
      const idx = dataFile.findIndex((productFilter) => {
        return productFilter._id === id;
      });
      if (idx === -1) throw 'can not find index product';
      // dataFile.splice(idx, 0);
      // dataFile.splice(idx, 1);
      const filteredItems = dataFile.slice(0, idx);
      // delete dataFile[idx];
      // const arr = dataFile.filter((p) => p._id !== id);
      fs.writeFile(DATA_FILE, JSON.stringify(filteredItems), (err, data) => {
        if (err) {
        } else {
        }
      });
    });
    return 'Remove';
  } catch (err) {}
}

async function add(product) {
  try {
    const txt = '`typeProduct.txt`';
    const id = '`typeProduct.id`';

    var query = `INSERT INTO product (_id,name,${txt},${id},stoke,typeFood,img,typePrice,createAt) VALUES (${_makeId()},"${
      product.name
    }","${product.typeProduct.txt}",${product.typeProduct.id},${product.stoke},"${product.typeFood}","${
      product.img
    }","${product.typePrice}",${Date.now()})`;
    const okPacket = await runSQL(query);
    // if (okPacket.affectedRows !== 0) return 'Add new Product !';
    // throw new Error(`No product updated - product id ${product._id}`);
    // return _addProduct(product);
  } catch (err) {
    logger.error('cannot insert product', err);
    throw err;
  }
}
function _makeId() {
  const possible = '0123456789';
  var num = '';
  for (let i = 0; i <= 3; i++) {
    num += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return +num;
}
async function getById(id) {
  const query = `SELECT * FROM product  WHERE product._id=${id}`;
  return runSQL(query).then((product) => {
    return product;
  });
}
// function _addProduct(product) {
//   product._id = _makeId();
//   fs.readFile(DATA_FILE, 'utf8', (err, data) => {
//     if (err) {
//       return;
//     }
//     const dataFile = JSON.parse(data.toString());
//     dataFile.push(product);
//     fs.writeFile(DATA_FILE, JSON.stringify(dataFile), (err, data) => {
//       if (err) {
//       } else {
//       }
//     });
//   });
//   return 'Add success';
// }
async function update(product) {
  try {
    const query = `UPDATE product set name = "${product.name}",typeProduct.txt="${product.typeProduct.txt}",
      typeProduct._id=${product.typeProduct._id},stoke=${product.stoke},
        typeFood="${product.typeFood}",img="${product.img}",typePrice="${product.typePrice}"
        ,WHERE product._id = ${product._id}`;
    // check the update !!
    const okPacket = await runSQL(query);
    if (okPacket.affectedRows !== 0) return okPacket;
    throw new Error(`No product updated - product id ${product._id}`);
    // fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    //     if (err) {
    //       return;
    //     }
    //     const dataFile = JSON.parse(data.toString());
    //     const idx = dataFile.findIndex((p) => p._id === product._id);
    //     dataFile.splice(1, idx, product);
    //     fs.writeFile(DATA_FILE, JSON.stringify(dataFile), (err, data) => {
    //       if (err) {
    //       } else {
    //       }
    //     });
    //   });
    //   return 'update!';
  } catch (error) {}
}
module.exports = {
  query,
  remove,
  add,
  update,
  getById,
};
