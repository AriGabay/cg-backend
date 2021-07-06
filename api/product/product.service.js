const db = require('../../models/index');

class ProductService {
  async createProduct({ newProduct }) {
    try {
      return await db.Product.create({ ...newProduct });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async getProducts(query, include = false) {
    try {
      if (include === 'true') include = true;
      if (include === 'false') include = false;
      const includeConfig = { all: include, nested: include };
      return await db.Product.findAll({
        where: { ...query, inStock: 1 },
        include: include ? includeConfig : undefined,
      });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async updateProduct(id, dataToEdit) {
    try {
      return await db.Product.update(
        { ...dataToEdit },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async removeProduct(id) {
    return await db.Product.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ProductService;
