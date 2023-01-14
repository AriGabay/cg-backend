const myUrl = '/api/gannay-eylon/category';
class CategoryGnRoute {
  constructor(app, categoryGnController) {
    this.CategoryGnController = categoryGnController;
    this.app = app;
    this.get();
    this.remove();
    this.update();
    this.create();
  }
  get() {
    this.app.get(myUrl, this.CategoryGnController.getCategories);
  }
  remove() {
    this.app.delete(myUrl, this.CategoryGnController.removeCategory);
  }
  update() {
    this.app.put(myUrl, this.CategoryGnController.updateCategory);
  }
  create() {
    this.app.post(myUrl, this.CategoryGnController.createCategory);
  }
}

module.exports = CategoryGnRoute;
