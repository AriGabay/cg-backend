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
  // createPrice = async (req, res) => {
  //   try {
  //     const price = await this.orderService.createPrice({ dataPrice: req.body });
  //     if (price) {
  //       res.send(price);
  //     } else {
  //       throw Error('Can not create price');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
  // removePrice = async (req, res) => {
  //   try {
  //     const id = req.query.id;
  //     const result = await this.orderService.removePrice({ id });
  //     if (result === 1) {
  //       res.send(`success remove price id : ${id}`);
  //       // res.send(`success remove price id :${id}`);
  //     } else {
  //       throw Error('Can not remove price');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
  // updatePrice = async ({ body }, res) => {
  //   try {
  //     const id = body.id;
  //     const price = await this.orderService.updatePrice(id, body);
  //     if (price && price.length) {
  //       res.send(`success update price id : ${id} to Display Name : ${body.displayName}`);
  //     } else {
  //       throw Error('Can not update price');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
}
module.exports = OrderController;
