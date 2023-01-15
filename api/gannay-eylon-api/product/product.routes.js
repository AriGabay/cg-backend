const myUrl = '/api/gannay-eylon/product';
class ProductGnRoute {
  constructor(app, productGnController) {
    this.ProductGnController = productGnController;
    this.app = app;
    this.get();
    this.remove();
    this.update();
    this.create();
  }
  get() {
    this.app.get(myUrl, this.ProductGnController.getProducts);
  }
  remove() {
    this.app.delete(
      myUrl + '/:productId',
      this.ProductGnController.removeProduct
    );
  }
  update() {
    this.app.put(myUrl + '/:productId', this.ProductGnController.updateProduct);
  }
  create() {
    this.app.post(myUrl, this.ProductGnController.createProduct);
  }
}

module.exports = ProductGnRoute;
