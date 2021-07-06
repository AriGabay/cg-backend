class SizePriceController {
  constructor(SizePriceService) {
    this.sizePriceService = SizePriceService;
  }
  getSizePrice = async (req, res) => {
    try {
      const { include, ...query } = req.query;
      const sizePrice = await this.sizePriceService.getSizePries({ ...query }, !!include ?? false);
      if (sizePrice && sizePrice.length) {
        res.send(sizePrice);
      } else {
        throw Error('No sizePrice found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  createSizePrice = async (req, res) => {
    try {
      const sizePrice = await this.sizePriceService.createSizePrice({ data: req.body });
      if (sizePrice) {
        res.send(sizePrice);
      } else {
        throw Error('Can not create sizePrice');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removeSizePrice = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.sizePriceService.removeSizePrice(id);
      console.log('sizePrice:', result);
      if (result === 1) {
        res.send(`success remove sizePrice id : ${id}`);
      } else {
        throw Error('Can not remove sizePrice');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };

  updateSizePrice = async ({ body }, res) => {
    try {
      const id = body.id;
      const result = await this.sizePriceService.updateSizePrice(id, body);
      if (result && result.length) {
        res.send(`success update sizePrice id : ${id}`);
      } else {
        throw Error('Can not update sizePrice');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = SizePriceController;
