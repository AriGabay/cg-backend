const db = require('../../../models-gannay-eylon/index');

class ProductGnService {
  async getProducts() {
    try {
      return await db.ProductGn.findAll();
    } catch (error) {
      console.error({
        error: true,
        message: `[GET_PRODUCTS_MENU_ONLINE_SERVICE] ${
          error?.message ?? error
        }`,
      });
    }
  }
  async createProduct(product) {
    try {
      return await db.ProductGn.create({ ...product });
    } catch (error) {
      console.error({
        error: true,
        message: `[GET_PRODUCTS_MENU_ONLINE_SERVICE] ${
          error?.message ?? error
        }`,
      });
    }
  }
}

module.exports = ProductGnService;
