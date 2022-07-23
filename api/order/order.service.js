const db = require('../../models/index');
const { Op } = require('sequelize');

class OrderService {
  async getOrders(query, include = false) {
    try {
      const includeConfig = { all: include, nested: include };
      const orders = await db.Order.findAll({ where: { ...query }, include: include ? includeConfig : undefined });
      orders.forEach((order) => {
        order.order = JSON.parse(order.order);
      });
      return orders;
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }
  async getOrdersByDate(dates) {
    try {
      const totalProducts = [];
      const startDay = new Date(dates.start);
      const endDay = new Date(dates.end);
      const orders = await db.Order.findAll({ where: { createdAt: { [Op.between]: [startDay, endDay] } } });
      orders.forEach((order) => {
        order.order = JSON.parse(order.order);
        if (order.order.products) {
          order.order.products.forEach((product) => {
            if (!totalProducts[product.id]) {
              totalProducts[product.id] = product;
            } else {
              totalProducts[product.id].sizeToOrder += product.sizeToOrder;
            }
          });
        }
      });
      return { orders, totalProducts: { ...totalProducts } };
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }
}

module.exports = OrderService;
