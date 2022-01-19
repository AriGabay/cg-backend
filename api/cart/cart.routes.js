const myUrl = '/api/cart';
class CartRoute {
  constructor(app, CartController) {
    this.CartController = CartController;
    this.app = app;
    this.post();
    this.postOrder();
  }
  postOrder() {
    this.app.post(myUrl + '/sendOrder', this.CartController.sendOrder);
  }
  post() {
    this.app.post(myUrl, this.CartController.createOrder);
  }
}

module.exports = CartRoute;
