const { log } = require('../../middlewares/logger.middleware');
const { parseQueryParm } = require('../../middlewares/parseQueryParam');
const orderUrl = '/api/order/';
class OrderRoute {
  constructor(app, OrderController) {
    this.OrderController = OrderController;
    this.app = app;
    this.get();
    this.getByDates();
  }
  get() {
    this.app.get(orderUrl, log, parseQueryParm, this.OrderController.getOrder);
  }
  getByDates() {
    this.app.get(orderUrl + 'getOrdersByDate', log, parseQueryParm, this.OrderController.getOrdersByDate);
  }
}

module.exports = OrderRoute;
