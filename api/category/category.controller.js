class CategoryController {
  constructor(CategoryService) {
    this.categoryService = CategoryService;
  }
  getCategory = async (req, res) => {
    try {
      console.log('get Category start controller');
      console.log('req.query:', req.query);
      const { include, ...query } = req.query;
      const categories = await this.categoryService.getCategories({ ...query }, include ?? false);
      if (categories && categories.length) {
        console.log('categories:', categories);
        res.send(categories);
      } else {
        throw Error('No categories found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
    console.log('getCategory end controller');
  };
  createCategory = async (req, res) => {
    try {
      console.log('create Category start controller');
      console.log('req:', req);
      console.log('req.body:', req.body);
      const category = await this.categoryService.createCategory(req.body);
      if (category) {
        res.send(category);
      } else {
        throw Error('Can not create category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
    console.log('create Category end controller');
  };
  removeCategory = async (req, res) => {
    try {
      console.log('remove Category start controller');
      const { id } = req.query;
      console.log('id:', id);
      const categories = await this.categoryService.removeCategory(id);
      if (categories === 1) {
        res.send(`success remove category id : ${id}`);
      } else {
        throw Error('Can not remove category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
    console.log('remove Category end controller');
  };
  updateCategory = async ({ body }, res) => {
    try {
      console.log('update Category start controller');
      const id = body.id;
      const displayName = { displayName: body.displayName };
      console.log('id:', id);
      console.log('displayName:', displayName);
      const category = await this.categoryService.updateCategory(id, displayName);
      if (category && category.length) {
        res.send(`success update category id : ${id} to Display Name : ${body.displayName}`);
      } else {
        throw Error('Can not update category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
    console.log('update Category end controller');
  };
}
module.exports = CategoryController;
