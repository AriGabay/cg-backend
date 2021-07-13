const { log } = require('../../middlewares/logger.middleware');
const priceUrl = '/api/price';
class PriceRoute {
  constructor(app, PriceController) {
    this.PriceController = PriceController;
    this.app = app;
    this.get();
    this.post();
    // this.getById();
    this.update();
    this.remove();
  }
  get() {
    this.app.get(priceUrl, log, this.PriceController.getPrice);
  }
  post() {
    this.app.post(priceUrl, this.PriceController.createPrice);
  }
  getById() {
    this.app.get('/:query', log, this.PriceController.getPrice);
  }
  update() {
    this.app.put(`${priceUrl}/:id`, this.PriceController.updatePrice);
  }
  remove() {
    this.app.delete(`${priceUrl}/:id`, this.PriceController.removePrice);
  }
}

module.exports = PriceRoute;
