class CategoryGnController {
  constructor(categoryGnService) {
    this.CategoryGnService = categoryGnService;
  }

  getCategories = async (req, res) => {
    try {
      const categories = await this.CategoryGnService.getCategories(req.query);
      if (categories && categories.length) {
        res.send(categories);
      } else {
        throw Error('[GET_CATEGORIES_GN_CONTROLLER] No found categories');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removeCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const result = await this.CategoryGnService.removeCategory(categoryId);
      if (result === 1) {
        res.send(`success remove category id : ${categoryId}`);
      } else {
        throw Error('Can not remove category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateCategory = async ({ body }, res) => {
    try {
      const { id, ...dataToEdit } = body;
      const result = await this.CategoryGnService.updateCategory(
        id,
        dataToEdit
      );
      if (result.length) {
        res.send(`success update category id : ${id}`);
      } else {
        throw Error('Can not update category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  createCategory = async (req, res) => {
    try {
      const result = await this.CategoryGnService.createCategory(req.body);
      if (result) {
        res.send(result);
      } else {
        throw Error('Can not create Category');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = CategoryGnController;
