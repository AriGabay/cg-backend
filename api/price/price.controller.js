class PriceController {
  constructor(PriceService) {
    this.priceService = PriceService;
  }
  getPrice = async (req, res) => {
    try {
      const { include, ...query } = req.query;
      const prices = await this.priceService.getPrices({ ...query }, include);
      if (prices && prices.length) {
        res.send(prices);
      } else {
        throw Error('No prices found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  createPrice = async (req, res) => {
    try {
      const price = await this.priceService.createPrice(req.body);
      if (price) {
        res.send(price);
      } else {
        throw Error('Can not create price');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removePrice = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.priceService.removePrice(id);
      if (result === 1) {
        res.send(`success remove price id : ${id}`);
      } else {
        throw Error('Can not remove price');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updatePrice = async ({ body, params }, res) => {
    try {
      const id = params.id;
      const price = await this.priceService.updatePrice(id, body);
      if (price && price.length) {
        res.send(`success update price id : ${id} to Display Name : ${body.displayName}`);
      } else {
        throw Error('Can not update price');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = PriceController;
