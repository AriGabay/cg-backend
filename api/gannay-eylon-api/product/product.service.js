const db = require('../../../models-gannay-eylon/index');

class ProductGnService {
  async getProducts(query) {
    try {
      const options = {
        attributes: [
          'id',
          'productName',
          'imgUrl',
          'description',
          'categoryId',
        ],
      };
      if (Object.keys(query).length) {
        options.where = { ...query };
      }

      return await db.ProductGn.findAll({ ...options });
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
  async removeGnProduct(id) {
    try {
      return await db.ProductGn.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error({
        error: true,
        message: `[REMOVE_GN_PRODUCT_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
  async updateGnProduct(id, data) {
    try {
      return await db.ProductGn.update(
        { ...data },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      console.error({
        error: true,
        message: `[UPDATE_GN_PRODUCT_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
}

module.exports = ProductGnService;
