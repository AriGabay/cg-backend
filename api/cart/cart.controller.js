class cartController {
  constructor(CartService) {
    this.cartService = CartService;
  }
  // getCategory = async (req, res) => {
  //   try {
  //     const { include, ...query } = req.query;
  //     const categories = await this.cartService.getCategories({ ...query }, include ?? false);
  //     if (categories && categories.length) {
  //       res.send(categories);
  //     } else {
  //       throw Error('No categories found');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
  createOrder = async (req, res) => {
    try {
      console.log('req.body', req.body);
      const totalCart = await this.cartService.createOrder(req.body);
      res.send(totalCart);
    } catch (error) {
      console.error('error:', error);
    }
  };

  sendOrder = async (req, res) => {
    try {
      const { cart, userDetails } = req.body;
      const totalCart = await this.cartService.createOrder(cart);
      const html = await this.cartService.buildHtml(totalCart, userDetails);
      // this.cartService.sendOrder(html);
      // console.log('totalCart', totalCart);
    } catch (error) {
      console.log('error:', error);
    }
  };
  // createCategory = async (req, res) => {
  //   try {
  //     const category = await this.cartService.createCategory({ body: req.body });
  //     if (category) {
  //       res.send(category);
  //     } else {
  //       throw Error('Can not create category');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
  // removeCategory = async (req, res) => {
  //   try {
  //     const id = req.query.id;
  //     const categories = await this.cartService.removeCategory({ id });
  //     if (categories === 1) {
  //       res.send(`success remove category id : ${id}`);
  //       // res.send(`success remove category id :${id}`);
  //     } else {
  //       throw Error('Can not remove category');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
  // updateCategory = async ({ body }, res) => {
  //   try {
  //     const id = body.id;
  //     const displayName = { displayName: body.displayName };
  //     const category = await this.cartService.updateCategory(id, displayName);
  //     if (category && category.length) {
  //       res.send(`success update category id : ${id} to Display Name : ${body.displayName}`);
  //     } else {
  //       throw Error('Can not update category');
  //     }
  //   } catch (error) {
  //     res.status(404).send({ error: true, message: error?.message ?? error });
  //   }
  // };
}
module.exports = cartController;
