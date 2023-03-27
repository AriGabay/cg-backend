class cartController {
  constructor(CartService) {
    this.cartService = CartService;
  }
  createOrder = async (req, res) => {
    try {
      const totalCart = await this.cartService.createOrder(req.body);
      if (!totalCart || !Object.keys(totalCart).length) {
        throw new Error('total cart is empty');
      }
      res.send(totalCart);
    } catch (error) {
      console.error('[CREATE_ORDER] error:', error);
    }
  };

  sendOrder = async (req, res) => {
    try {
      const { cart, userDetails } = req.body;
      const totalCart = await this.cartService.createOrder(cart);
      await this.cartService.buildHtml(totalCart, userDetails);
      res.send('הזמנה בוצעה, סיכום הזמנה נשלח במייל');
    } catch (error) {
      console.log('[SEND_ORDER] error:', error);
    }
  };
  updateOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const { order, products } = req.body;
      const totalCart = await this.cartService.updateOrder(
        orderId,
        order,
        products
      );
      res.send(totalCart);
    } catch (error) {
      console.log('[SEND_ORDER] error:', error);
    }
  };
}
module.exports = cartController;
