const db = require('../../../models-gannay-eylon/index');

class CategoryGnService {
  async getCategories() {
    try {
      return await db.CategoryGn.findAll();
    } catch (error) {
      console.error({
        error: true,
        message: `[GET_CATEGORIES_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
  async createCategory(category) {
    try {
      return await db.CategoryGn.create({ ...category });
    } catch (error) {
      console.error({
        error: true,
        message: `[GET_CATEGORIES_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
}

module.exports = CategoryGnService;
