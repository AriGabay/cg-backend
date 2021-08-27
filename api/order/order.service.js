const db = require('../../models/index');
const { Op } = require('sequelize');

class OrderService {
  async getOrders(query, include = false) {
    try {
      if (include === 'true') include = true;
      if (include === 'false') include = false;
      const includeConfig = { all: include, nested: include };
      const orders = await db.Order.findAll({ where: { ...query }, include: include ? includeConfig : undefined });
      orders.map((order) => {
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
        order.order.products.forEach((product) => totalProducts.push(product));
      });
      const calcTotalProducts = [];
      totalProducts.forEach((product) => {
        if (calcTotalProducts.some((prod) => product.id === prod.id)) {
          const idx = calcTotalProducts.findIndex((pro) => pro.id === product.id);
          calcTotalProducts[idx].sizeToOrder += product.sizeToOrder;
        } else {
          calcTotalProducts.push(product);
        }
      });

      const arr = [orders, calcTotalProducts, totalProducts.length];
      return arr;
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }
}

module.exports = OrderService;
