class CategoryController {
  constructor(CategoryService) {
    this.categoryService = CategoryService;
  }
  getCategory = async (req, res) => {
    try {
      console.log('[GET_CATEGORY_CONTROLLER] req.query:', req.query);
      const { include, ...query } = req.query;
      const categories = await this.categoryService.getCategories({ ...query }, include ?? false);
      if (categories && categories.length) {
        res.send(categories);
      } else {
        throw Error('[GET_CATEGORY_CONTROLLER] No categories found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  createCategory = async (req, res) => {
    try {
      console.log('[CREATE_CATEGORY_CONTROLLER] req.body:', req.body);
      const category = await this.categoryService.createCategory(req.body);
      if (category) {
        res.send(category);
      } else {
        throw Error("[CREATE_CATEGORY_CONTROLLER] Couldn't create category");
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removeCategory = async (req, res) => {
    try {
      console.log('[REMOVE_CATEGORY_CONTROLLER] req.query:', req.query);
      const { id } = req.query;
      const categories = await this.categoryService.removeCategory(id);
      if (categories === 1) {
        res.send(`success remove category id : ${id}`);
      } else {
        throw Error('[REMOVE_CATEGORY_CONTROLLER] Can not remove category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateCategory = async ({ body }, res) => {
    try {
      console.log('[UPDATE_CATEGORY_CONTROLLER] req.body:', req.body);
      const id = body.id;
      const displayName = { displayName: body.displayName };
      const category = await this.categoryService.updateCategory(id, displayName);
      if (category) {
        res.send(`success update category id : ${id} to Display Name : ${body.displayName}`);
      } else {
        throw Error('[UPDATE_CATEGORY_CONTROLLER] Can not update category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = CategoryController;
