class ProductController {
  constructor(ProductService) {
    this.productService = ProductService;
  }
  getProduct = async (req, res) => {
    try {
      const { include, ...query } = req.query;
      const products = await this.productService.getProducts({ ...query }, include ?? false);
      if (products && products.length) {
        res.send(products);
      } else {
        throw Error('No product found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  createProduct = async (req, res) => {
    try {
      const result = await this.productService.createProduct({ newProduct: req.body });
      if (result) {
        res.send(result);
      } else {
        throw Error('Can not create Product');
      }
    } catch (error) {
      result.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  removeProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.productService.removeProduct(id);
      if (result === 1) {
        res.send(`success remove product id : ${id}`);
      } else {
        throw Error('Can not remove product');
      }
    } catch (error) {
      result.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateProduct = async ({ body, query }, res) => {
    try {
      const id = query.id;
      const dataToEdit = { ...body };
      const result = await this.productService.updateProduct(id, dataToEdit);
      if (result.length) {
        res.send(`success update product id : ${id}`);
      } else {
        throw Error('Can not update product');
      }
    } catch (error) {
      result.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = ProductController;
