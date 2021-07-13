const { log } = require('../../middlewares/logger.middleware');
const myUrl = '/api/category';
class CategoryRoute {
  constructor(app, CategoryController) {
    this.CategoryController = CategoryController;
    this.app = app;
    this.get();
    this.post();
    // this.getById();
    this.update();
    this.remove();
  }
  get() {
    this.app.get(`${myUrl}`, log, this.CategoryController.getCategory);
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
