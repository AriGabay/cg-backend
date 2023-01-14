class OnlineMenuController {
  constructor(productGnService) {
    this.ProductGnService = productGnService;
  }

  getProducts = async (req, res) => {
    try {
      const productsMenu = await this.ProductGnService.getProducts();
      if (productsMenu && productsMenu.length) {
        res.send(productsMenu);
      } else {
        throw Error('[GET_PRODUCT_GN_CONTROLLER] No products found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removeProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.ProductGnService.removeProduct(id);
      if (result === 1) {
        res.send(`success remove product id : ${id}`);
      } else {
        throw Error('Can not remove product');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateProduct = async ({ body, params }, res) => {
    try {
      const id = params.id;
      const dataToEdit = { ...body };
      const result = await this.ProductGnService.updateProduct(id, dataToEdit);
      if (result.length) {
        res.send(`success update product id : ${id}`);
      } else {
        throw Error('Can not update product');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  createProduct = async (req, res) => {
    try {
      const result = await this.ProductGnService.createProduct(req.body);
      if (result) {
        res.send(result);
      } else {
        throw Error('Can not create Product');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = OnlineMenuController;
