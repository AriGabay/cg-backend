const { log } = require('../../middlewares/logger.middleware');
const { parseQueryParm } = require('../../middlewares/parseQueryParam');
const myUrl = '/api/category';
class CategoryRoute {
  constructor(app, CategoryController) {
    this.CategoryController = CategoryController;
    this.app = app;
    this.get();
    this.post();
    this.update();
    this.remove();
    this.getMenu();
    this.getCategoryDropDown();
  }
  get() {
    this.app.get(`${myUrl}`, log, parseQueryParm, this.CategoryController.getCategory);
  }
  getMenu() {
    this.app.get(`${myUrl}/menu`, log, parseQueryParm, this.CategoryController.getCategoryMenu);
  }
  getCategoryDropDown() {
    this.app.get(`${myUrl}/dropdown`, log, this.CategoryController.getCategoryDropDown);
  }
  post() {
    this.app.post(myUrl, this.CategoryController.createCategory);
  }
  getById() {
    this.app.get('/:query', log, this.CategoryController.getCategory);
  }
  update() {
    this.app.put(`${myUrl}/:id`, this.CategoryController.updateCategory);
  }
  remove() {
    this.app.delete(`${myUrl}/:id`, this.CategoryController.removeCategory);
  }
}

module.exports = CategoryRoute;
