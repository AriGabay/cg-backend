const db = require('../../../models-gannay-eylon/index');

class CategoryGnService {
  async getCategories(query) {
    try {
      const options = {
        attributes: ['id', 'displayName'],
      };
      if (Object.keys(query).length) {
        options.where = { ...query };
      }
      return await db.CategoryGn.findAll({ ...options });
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
  async removeCategory(id) {
    try {
      return await db.CategoryGn.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error({
        error: true,
        message: `[REMOVE_CATEGORY_SERVICE] ${error?.message ?? error}`,
      });
    }
  }

  async updateCategory(id, data) {
    try {
      return await db.CategoryGn.update(
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
        message: `[UPDATE_CATEGORY_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
}

module.exports = CategoryGnService;
