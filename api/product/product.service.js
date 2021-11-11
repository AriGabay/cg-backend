const category = require('../../models/category');
const db = require('../../models/index');
const SizePrices = require('../../models/size_price');
const Price = require('../../models/price');

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
      let inc = false;
      include.includes('true') ? (inc = true) : (inc = false);
      const includeConfig = { all: inc, nested: inc };
      if (query.pathName) {
        const { pathName } = query;
        let isMenuPesach = false;
        let isMenuWeekend = false;
        let isMenuTishray = false;
        if (pathName.includes('weekend')) {
          isMenuWeekend = true;
        } else if (pathName.includes('tishray')) {
          isMenuTishray = true;
        } else if (pathName.includes('pesach')) {
          isMenuPesach = true;
        }
        const configMenu = {};
        isMenuPesach ? (configMenu.isMenuPesach = true) : null;
        isMenuTishray ? (configMenu.isMenuTishray = true) : null;
        isMenuWeekend ? (configMenu.isMenuWeekend = true) : null;
        const offset = query.page * 6;
        delete query['pathName'];
        delete query['page'];
        return await db.Product.findAll({
          limit: 6,
          offset: offset,
          where: { ...query, ...configMenu },
          include: inc ? includeConfig : undefined
        });
      } else if (query.id) {
        return await db.Product.findAll({
          where: { ...query },
          include: inc ? includeConfig : undefined
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
  async getAllProducts(xx, include = false) {
    // let inc = false;
    // include.includes('true') ? (inc = true) : (inc = false);
    // const includeConfig = { all: inc, nested: inc };
    return await db.Product.findAll();
  }
}

module.exports = ProductService;
