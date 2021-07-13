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
}
module.exports = OrderController;
