const db = require('../../models/index');

class CategoryService {
  async createCategory(body) {
    try {
      const query = undefined;
      const include = false;
      const data = await this.getCategories(query, include);
      if (data && data.length) {
        data.forEach((element) => {
          if (element.displayName === body.displayName) {
            throw Error('[CREATE_CATEGORY_SERVICE] cannot add category');
          }
        });
      }
      return await db.Category.create({
        displayName: body.displayName,
        imgUrl: body.imgUrl,
        description: body.description
      });
    } catch (error) {
      console.error({ error: true, message: `[CREATE_CATEGORY_SERVICE] ${error?.message ?? error}` });
    }
  }

  async getCategories(query, include = false) {
    try {
      console.time('get category from DB : ');
      if (include === 'true') include = true;
      if (include === 'false') include = false;
      const includeConfig = { all: include, nested: include };
      const res = await db.Category.findAll({ where: { ...query }, include: include ? includeConfig : undefined });
      console.timeEnd('get category from DB : ');
      return res;
    } catch (error) {
      console.error({ error: true, message: `[GET_CATEGORY_SERVICE] ${error?.message ?? error}` });
    }
  }

  async updateCategory(id, data) {
    try {
      return await db.Category.update(
        { ...data },
        {
          where: {
            id
          }
        }
      );
    } catch (error) {
      console.error({ error: true, message: `[UPDATE_CATEGORY_SERVICE] ${error?.message ?? error}` });
    }
  }

  async removeCategory(id) {
    try {
      return await db.Category.destroy({
        where: {
          id
        }
      });
    } catch (error) {
      console.error({ error: true, message: `[REMOVE_CATEGORY_SERVICE] ${error?.message ?? error}` });
    }
  }
}

module.exports = CategoryService;
