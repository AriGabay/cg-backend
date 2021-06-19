const { log } = require('../../middlewares/logger.middleware');
const myUrl = '/api/sizePrice';
class SizePriceRoute {
  constructor(app, SizePriceController) {
    this.SizePriceController = SizePriceController;
    this.app = app;
    this.get();
    this.post();
    // this.getById();
    this.update();
    this.remove();
  }
  get() {
    this.app.get(myUrl, log, this.SizePriceController.getSizePrice);
  }
  post() {
    this.app.post(myUrl, this.SizePriceController.createSizePrice);
  }
  getById() {
    this.app.get('/:query', log, this.SizePriceController.getSizePrice);
  }
  update() {
    this.app.put(myUrl, this.SizePriceController.updateSizePrice);
  }
  remove() {
    this.app.delete(`${myUrl}/:id`, this.SizePriceController.removeSizePrice);
  }
}

module.exports = SizePriceRoute;
