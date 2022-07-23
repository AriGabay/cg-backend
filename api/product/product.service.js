const { sequelize } = require('../../models/index');
const db = require('../../models/index');
class ProductService {
  async createProduct({ newProduct }) {
    try {
      return await db.Product.create({ ...newProduct });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async getProducts(
    query,
    attributes = { exclude: ['createdAt', 'updatedAt'] },
    subAttributesCategory = { exclude: ['createdAt', 'updatedAt'] },
    raw = false,
    subAttributesPrice = { exclude: ['createdAt', 'updatedAt'] },
    subAttributesSizePrice = { exclude: ['createdAt', 'updatedAt'] }
  ) {
    try {
      const includeConfig = [
        { model: sequelize.model('Category'), attributes: subAttributesCategory },
        {
          model: sequelize.model('Price'),
          attributes: subAttributesPrice,
          include: { model: sequelize.model('SizePrice'), attributes: subAttributesSizePrice }
        }
      ];
      if (query.pathName) {
        const { pathName, page, ...queryOnly } = query;
        if (pathName.includes('weekend')) {
          Object.assign(queryOnly, { isMenuWeekend: true });
        } else if (pathName.includes('tishray')) {
          Object.assign(queryOnly, { isMenuTishray: true });
        } else if (pathName.includes('pesach')) {
          Object.assign(queryOnly, { isMenuPesach: true });
        }
        return await db.Product.findAll({
          limit: 6,
          offset: page * 6,
          where: { ...queryOnly },
          include: includeConfig ? includeConfig : undefined,
          raw: raw,
          attributes: attributes
        });
      } else if (query.id) {
        return await db.Product.findOne({
          where: { ...query },
          include: includeConfig ? includeConfig : undefined,
          raw: raw,
          attributes: attributes
        });
      }
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
            id
          }
        }
      );
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async removeProduct(id) {
    return await db.Product.destroy({
      where: {
        id
      }
    });
  }
  async getAllProducts() {
    return await db.Product.findAll();
  }
}

module.exports = ProductService;
