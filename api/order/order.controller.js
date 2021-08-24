class OrderController {
  constructor(OrderService) {
    this.orderService = OrderService;
  }
  getOrder = async (req, res) => {
    try {
      const { include, ...query } = req.query;
      const orders = await this.orderService.getOrders({ ...query }, !!include ?? false);
      if (orders && orders.length) {
        res.send(orders);
      } else {
        throw Error('No orders found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  getOrdersByDate = async (req, res) => {
    try {
      const dates = req.query;
      console.log('dates:', dates);
      const orders = await this.orderService.getOrdersByDate(dates);
      res.send(orders);
    } catch (error) {
      console.log('error:', error);
    }
  };
}
module.exports = OrderController;
