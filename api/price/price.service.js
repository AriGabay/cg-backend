const db = require('../../models/index');

class PriceService {
  async createPrice({ dataPrice }) {
    try {
      if (dataPrice.priceType === '1') dataPrice.priceType = 'box';
      else if (dataPrice.priceType === '2') dataPrice.priceType = 'weight';
      else if (dataPrice.priceType === '3') dataPrice.priceType = 'unit';
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

  async getPrices(query, include = false) {
    try {
      const includeConfig = { all: true, nested: true };
      return await db.Price.findAll({ where: { ...query }, include: include ? includeConfig : undefined });
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
