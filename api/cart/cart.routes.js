const { log } = require('../../middlewares/logger.middleware');
const myUrl = '/api/cart';
class CartRoute {
  constructor(app, CartController) {
    this.CartController = CartController;
    this.app = app;
    // this.get();
    this.post();
    this.postOrder();
    // this.postOrder();
    // this.getById();
    // this.update();
    // this.remove();
  }
  // get() {
  //   this.app.get(`${myUrl}`, log, this.CartController.getCategory);
  // }
  postOrder() {
    this.app.post(myUrl + '/sendOrder', this.CartController.sendOrder);
  }
  post() {
    this.app.post(myUrl, this.CartController.createOrder);
  }
  // getById() {
  //   this.app.get('/:query', log, this.CartController.getCategory);
  // }
  // update() {
  //   this.app.put(myUrl, this.CartController.updateCategory);
  // }
  // remove() {
  //   this.app.delete(`${myUrl}/:id`, this.CartController.removeCategory);
  // }
}

module.exports = CartRoute;
