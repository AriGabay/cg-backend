const myUrl = '/api/product';
class ProductRoute {
  constructor(app, ProductController) {
    this.ProductController = ProductController;
    this.app = app;
    this.get();
    this.post();
    this.update();
    this.remove();
    this.getAll();
  }
  get() {
    this.app.get(myUrl, this.ProductController.getProduct);
  }
  getAll() {
    this.app.get(myUrl + '/all', this.ProductController.getAllProducts);
  }
  post() {
    this.app.post(myUrl, this.ProductController.createProduct);
  }
  update() {
    this.app.put(`${myUrl}/:id`, this.ProductController.updateProduct);
  }
  remove() {
    this.app.delete(`${myUrl}/:id`, this.ProductController.removeProduct);
  }
}

module.exports = ProductRoute;
