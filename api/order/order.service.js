const db = require('../../models/index');

class PriceService {
  async createPrice({ dataPrice }) {
    try {
      if (
        !dataPrice.priceType.length ||
        !dataPrice.displayName.length ||
        !dataPrice.priceType === 'box' ||
        !dataPrice.priceType === 'unit' ||
        !dataPrice.priceType === 'weight'
      ) {
        throw Error('set all parameters');
      } else {
        return await db.Price.create({ ...dataPrice });
      }
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

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

  async updatePrice(id, data) {
    return await db.Price.update(
      { ...data },
      {
        where: {
          id,
        },
      }
    );
  }

  async removePrice({ id }) {
    return await db.Price.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = PriceService;
