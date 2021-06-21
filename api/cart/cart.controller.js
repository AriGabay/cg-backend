class cartController {
  constructor(CartService) {
    this.cartService = CartService;
  }
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
      await this.cartService.buildHtml(totalCart, userDetails);
      res.send('הזמנה בוצעה, סיכום הזמנה נשלח במייל');
    } catch (error) {
      console.log('error:', error);
    }
  };
}
module.exports = cartController;
