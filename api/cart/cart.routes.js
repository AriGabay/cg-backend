const { parseQueryParm } = require('../../middlewares/parseQueryParam');
const myUrl = '/api/cart';
class CartRoute {
  constructor(app, CartController) {
    this.CartController = CartController;
    this.app = app;
    this.post();
    this.postOrder();
    this.put();
  }
  postOrder() {
    this.app.post(
      myUrl + '/sendOrder',
      parseQueryParm,
      this.CartController.sendOrder
    );
  }
  post() {
    this.app.post(myUrl, parseQueryParm, this.CartController.createOrder);
  }
  put() {
    this.app.put(
      myUrl + '/:id',
      parseQueryParm,
      this.CartController.updateOrder
    );
  }
}

module.exports = CartRoute;
