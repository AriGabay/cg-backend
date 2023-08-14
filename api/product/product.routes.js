const myUrl = '/api/product';
const { log } = require('../../middlewares/logger.middleware');
const { parseQueryParm } = require('../../middlewares/parseQueryParam');
class ProductRoute {
  constructor(app, ProductController) {
    this.ProductController = ProductController;
    this.app = app;
    this.get();
    this.post();
    this.update();
    this.remove();
    this.getAll();
    this.getByMenu();
    this.getBySerach();
  }
  get() {
    this.app.get(myUrl, log, parseQueryParm, this.ProductController.getProduct);
  }
  getAll() {
    this.app.get(
      myUrl + '/all',
      parseQueryParm,
      this.ProductController.getAllProducts
    );
  }
  getByMenu() {
    this.app.get(
      myUrl + '/byMenu',
      parseQueryParm,
      this.ProductController.getProductByMenu
    );
  }
  getBySerach() {
    this.app.get(
      myUrl + '/serach',
      parseQueryParm,
      this.ProductController.getProductSerach
    );
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
