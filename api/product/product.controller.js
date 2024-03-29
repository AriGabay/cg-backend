class ProductController {
  constructor(ProductService) {
    this.productService = ProductService;
  }
  getProduct = async (req, res) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { include, ...query } = req.query;
      const products = await this.productService.getProducts({ ...query });
      if (products) {
        res.send(products);
      } else {
        throw new Error('No products found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  getProductByMenu = async (req, res) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { include, ...query } = req.query;
      const products = await this.productService.getProducts(
        { ...query },
        ['displayName', 'description', 'id', 'imgUrl'],
        ['displayName']
      );
      if (!products || !products.length) {
        throw Error('No product found');
      }
      res.send(products);
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };

  createProduct = async (req, res) => {
    try {
      const result = await this.productService.createProduct({
        newProduct: req.body,
      });
      if (result) {
        res.send(result);
      } else {
        throw Error('Can not create Product');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
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
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateProduct = async ({ body, params }, res) => {
    try {
      const id = params.id;
      const dataToEdit = { ...body };
      const result = await this.productService.updateProduct(id, dataToEdit);
      if (result.length) {
        res.send(
          `success update product : ${dataToEdit.displayName} id : ${id}`
        );
      } else {
        throw Error('Can not update product');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      if (products && products.length) {
        res.send(products);
      } else {
        throw Error('No product found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  getProductSerach = async (req, res) => {
    try {
      const products = await this.productService.getProductSerach(req.query);
      if (products && products.length) {
        res.send(products);
      } else {
        throw Error('No product found');
      }
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = ProductController;
