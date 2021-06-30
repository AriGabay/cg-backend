class CategoryController {
  constructor(CategoryService) {
    this.categoryService = CategoryService;
  }
  getCategory = async (req, res) => {
    try {
      const { include, ...query } = req.query;
      const categories = await this.categoryService.getCategories({ ...query }, include ?? false);
      if (categories) {
        res.send(categories);
      } else {
        throw Error('No categories found');
      }
    } catch (error) {
      res.status(200).send({ error: true, message: error?.message ?? error });
    }
  };
  createCategory = async (req, res) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      if (category) {
        res.send(category);
      } else {
        throw Error('Can not create category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removeCategory = async (req, res) => {
    try {
      const id = req.params;
      const categories = await this.categoryService.removeCategory(id);
      if (categories === 1) {
        res.send(`success remove category id : ${id}`);
        // res.send(`success remove category id :${id}`);
      } else {
        throw Error('Can not remove category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateCategory = async ({ body }, res) => {
    try {
      const id = body.id;
      const displayName = { displayName: body.displayName };
      const category = await this.categoryService.updateCategory(id, displayName);
      if (category && category.length) {
        res.send(`success update category id : ${id} to Display Name : ${body.displayName}`);
      } else {
        throw Error('Can not update category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = CategoryController;
