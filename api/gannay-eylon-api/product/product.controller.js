class OnlineMenuController {
  constructor(productGnService) {
    this.ProductGnService = productGnService;
  }

  getProducts = async (req, res) => {
    try {
      const productsMenu = await this.ProductGnService.getProducts(req.query);
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
      const { productId } = req.params;
      const result = await this.ProductGnService.removeGnProduct(productId);
      if (result === 1) {
        res.send(`success remove product id : ${productId}`);
      } else {
        throw Error('Can not remove product');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateProduct = async ({ body }, res) => {
    try {
      const { id, ...dataToEdit } = { ...body };
      const result = await this.ProductGnService.updateGnProduct(
        id,
        dataToEdit
      );
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
