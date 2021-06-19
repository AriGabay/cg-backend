const db = require('../../models/index');

class SizePriceService {
  async createSizePrice({ data }) {
    try {
      if (!data.size && !data.amount && !data.priceId) throw Error('set all parameters');
      return await db.SizePrice.create({ ...data });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async getSizePries(query, include = false) {
    try {
      // return await db.SizePrice.findAll({ where: { ...query }, include: { all: include, nested: include } });
      const includeConfig = { all: true, nested: true };
      return await db.SizePrice.findAll({ where: { ...query }, include: include ? includeConfig : undefined });
    } catch (error) {
      console.error({ error: true, message: error?.message ?? error });
    }
  }

  async updateSizePrice(id, data) {
    return await db.SizePrice.update(
      { ...data },
      {
        where: {
          id,
        },
      }
    );
  }

  async removeSizePrice({ id }) {
    return await db.SizePrice.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = SizePriceService;
