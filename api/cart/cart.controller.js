const BUSINESS_PHONE = '04-6734949';

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
      // ללא res כאן הבקשה נשארה תלויה עד timeout בצד הלקוח.
      console.error('[CREATE_ORDER] error:', error);
      res.status(500).send('חישוב ההזמנה נכשל');
    }
  };

  sendOrder = async (req, res) => {
    try {
      const { cart, userDetails } = req.body;
      const totalCart = await this.cartService.createOrder(cart);
      const { orderId, mailSent } = await this.cartService.buildHtml(
        totalCart,
        userDetails
      );
      if (!mailSent) {
        // כישלון בגלוי: הלקוח חייב לדעת שהאישור לא נשלח וליצור קשר טלפוני.
        // 502 ולא 500 - ההזמנה עצמה נשמרה, רק שליחת המייל נכשלה. הפרונט
        // מבדיל ביניהם: ב-502 העגלה מתרוקנת כדי שלא תיווצר הזמנה כפולה.
        return res
          .status(502)
          .send(
            `ההזמנה נקלטה במערכת (מספר ${orderId}), אך שליחת אישור במייל נכשלה. ` +
              `נא ליצור קשר טלפוני עם קייטרינג גבאי בטלפון ${BUSINESS_PHONE} לאישור ההזמנה.`
          );
      }
      res.send('הזמנה בוצעה, סיכום הזמנה נשלח במייל');
    } catch (error) {
      // ההזמנה לא נשמרה - כאן דווקא נכון לבקש מהלקוח לנסות שוב.
      console.error('[SEND_ORDER] error:', error);
      res
        .status(500)
        .send(
          `שליחת ההזמנה נכשלה, נסה שוב. אם התקלה חוזרת נא להתקשר ${BUSINESS_PHONE}.`
        );
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
      console.error('[UPDATE_ORDER] error:', error);
      res.status(500).send('עדכון ההזמנה נכשל');
    }
  };
}
module.exports = cartController;
