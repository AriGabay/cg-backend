const logger = require('../../services/logger.service');
// const userService = require('../user/user.service')
const productService = require('./product.service');
// const productService = require('./review.service')

async function getProduct(req, res) {
  try {
    const products = await productService.query(req.query.filterBy);
    res.send(products);
  } catch (err) {
    logger.error('Cannot get product', err);
    res.status(500).send({ err: 'Failed to get product' });
  }
}

// async function deleteReview(req, res) {
//   try {
//     await productService.remove(req.params.id);
//     res.send({ msg: 'Deleted successfully' });
//   } catch (err) {
//     logger.error('Failed to delete review', err);
//     res.status(500).send({ err: 'Failed to delete review' });
//   }
// }

async function addProduct(req, res) {
  try {
    const product = req.body;
    if (!product._id) {
      const msgSuccuss = await productService.add(product);
      res.send(msgSuccuss);
    }
  } catch (err) {
    logger.error('Failed to add product', err);
    res.status(500).send({ err: 'Failed to add product' });
  }
}
async function updateProduct(req, res) {
  try {
    const product = req.body;
    msgSuccuss = await productService.update(product);
    res.send(msgSuccuss);
  } catch (error) {
    console.error('error:', error);
  }
}
async function getById(req, res) {
  try {
    const id = req.params.id;
    const product = await productService.getById(+id);
    res.send(product);
  } catch (error) {
    console.error('error:', error);
  }
}
async function removeProduct(req, res) {
  try {
    const id = req.params.id;
    // const idx = JSON.parse(id);
    msgSuccuss = await productService.remove(+id);
    res.send(msgSuccuss);
  } catch (error) {
    console.error('error:', error);
  }
}

module.exports = {
  getProduct,
  // deleteReview,
  addProduct,
  updateProduct,
  removeProduct,
  getById,
};
