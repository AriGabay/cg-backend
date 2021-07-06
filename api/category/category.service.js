const db = require('../../models/index');

class CategoryService {
  async createCategory(body) {
    try {
      console.log('create category start service');
      console.log('body:', body);
      const query = undefined;
      const include = false;
      const data = await this.getCategories(query, include);
      console.log('get category', data);
      console.log('body:', body);
      if (data && data.length) {
        data.map((element) => {
          console.log('element of category:', element);
          if (element.displayName === body.displayName) {
            throw Error('cannot add category');
          }
        });
      }
      return await db.Category.create({
        displayName: body.displayName,
        imgUrl: body.imgUrl,
        description: body.description,
      });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
    console.log('create category end service');
  }

  async getCategories(query, include = false) {
    try {
      console.log('get categories start service');
      if (include === 'true') include = true;
      if (include === 'false') include = false;
      const includeConfig = { all: include, nested: include };
      console.log('query:', query);
      console.log('include:', include);
      return await db.Category.findAll({ where: { ...query }, include: include ? includeConfig : undefined }).catch(
        (err) => {
          console.error('err:', err);
        }
      );
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
    console.log('get categories end service');
  }

  async updateCategory(id, displayName) {
    console.log('update categories start service');
    console.log('id, displayName:', id, displayName);
    return await db.Category.update(
      { ...displayName },
      {
        where: {
          id,
        },
      }
    );
  }

  async removeCategory(id) {
    console.log('remove category start service.');
    console.log('id to remove : ', id);
    return await db.Category.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CategoryService;
