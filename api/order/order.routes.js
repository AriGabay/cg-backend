const { log } = require('../../middlewares/logger.middleware');
const orderUrl = '/api/order';
class OrderRoute {
  constructor(app, OrderController) {
    this.OrderController = OrderController;
    this.app = app;
    this.get();
    // this.post();
    // this.getById();
    // this.update();
    // this.remove();
  }
  get() {
    this.app.get(orderUrl, log, this.OrderController.getOrder);
  }
  // post() {
  //   this.app.post(orderUrl, this.OrderController.createPrice);
  // }
  // getById() {
  //   this.app.get('/:query', log, this.OrderController.getPrice);
  // }
  // update() {
  //   this.app.put(orderUrl, this.OrderController.updatePrice);
  // }
  // remove() {
  //   this.app.delete(`${orderUrl}/:id`, this.OrderController.removePrice);
  // }
}

module.exports = OrderRoute;
