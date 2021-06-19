const db = require('../../models/index');

class ProductService {
  async createProduct({ newProduct }) {
    try {
      const { displayName, categoryId, inStock, imgUrl, priceId } = newProduct;
      return await db.Product.create({ displayName, categoryId, inStock, imgUrl, priceId });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async getProducts(query, include = false) {
    try {
      const bool = Boolean(include);
      const includeConfig = { all: bool, nested: bool };
      return await db.Product.findAll({ where: { ...query, inStock: 1 }, include: bool ? includeConfig : undefined });
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

  async removeProduct({ id }) {
    return await db.Product.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ProductService;
