const db = require('../../models/index');

class CategoryService {
  async createCategory(body) {
    try {
      console.log('body:', body);
      const query = undefined;
      const include = true;
      const data = await this.getCategories(query, include);
      data.map((element) => {
        if (element.displayName === body.displayName) {
          throw Error('cannot add category');
        }
      });
      console.log('body:', body);
      return await db.Category.create({
        displayName: body.displayName,
        imgUrl: body.imgUrl,
        description: body.description,
      });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async getCategories(query, include = false) {
    try {
      const bool = Boolean(include);
      console.log('bool:', bool);
      return await db.Category.findAll({ where: { ...query }, include: { all: bool, nested: bool } }).catch((err) => {
        console.log('err:', err);
      });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async updateCategory(id, displayName) {
    return await db.Category.update(
      { ...displayName },
      {
        where: {
          id,
        },
      }
    );
  }

  async removeCategory({ id }) {
    return await db.Category.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CategoryService;
