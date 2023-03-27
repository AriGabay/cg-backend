const db = require('../../models/index');
const emailService = require('../../services/email.service');
const { buildPdf } = require('./buildPdf.service');
const { buildHtml } = require('./email.template');

class CartService {
  async createOrder(cart) {
    if (!cart.length) throw new Error('cart is empty !');
    const totalCart = {
      time: new Date(),
    };
    totalCart.products = cart.map((totalProductFromFront) => {
      const { sizeToOrder, product } = totalProductFromFront;
      let pricePerSize = 0;
      if (product.Price.priceType === 'weight') {
        if (product.Price.SizePrices[0].size) {
          pricePerSize =
            (sizeToOrder / 100) * product.Price.SizePrices[0].amount;
        } else {
          throw new Error('product size must be = 100');
        }
      } else if (product.Price.priceType === 'box') {
        if (product.Price.SizePrices.length > 0) {
          const [size] = product.Price.SizePrices.filter(
            (sizePrice) => sizePrice.size === sizeToOrder
          );
          pricePerSize = size.amount;
        } else {
          throw new Error('product size empty');
        }
      } else if (product.Price.priceType === 'unit') {
        if (product.Price.SizePrices[0].size > 0) {
          pricePerSize =
            product.Price.SizePrices[0].amount *
            (sizeToOrder / product.Price.SizePrices[0].size);
        } else {
          throw new Error('product size need big from 0');
        }
      }
      totalCart.totalPrice
        ? (totalCart.totalPrice += pricePerSize)
        : (totalCart.totalPrice = pricePerSize);
      return { ...product, sizeToOrder, pricePerSize };
    });
    totalCart.Tax = +(totalCart.totalPrice * 0.17).toFixed(2);
    totalCart.unTax = +(totalCart.totalPrice * 0.83).toFixed(2);
    totalCart.totalPrice = +totalCart.totalPrice.toFixed(2);
    return totalCart;
  }

  async buildHtml(cart, userDetails) {
    try {
      const { id: orderId } = await db.Order.create({
        order: JSON.stringify({ ...userDetails, ...cart }),
      });
      const htmlForEmail = buildHtml(orderId, userDetails, cart);
      const bufferPdf = buildPdf(orderId, userDetails, cart);
      await emailService.sendMail(
        'הזמנה חדשה קייטרינג גבאי',
        htmlForEmail,
        userDetails.email,
        bufferPdf,
        orderId
      );
    } catch (error) {
      console.log('[BUILD_HTML] error:', error);
    }
  }
  checkPriceType(product) {
    if (product.Price.priceType === 'box') {
      return `קופסה של ${product.sizeToOrder} גרם`;
    } else if (product.Price.priceType === 'unit') {
      return `יחידות ${product.sizeToOrder}`;
    } else if (product.Price.priceType === 'weight') {
      return `${product.sizeToOrder} גרם`;
    }
  }
  async updateOrder(orderId, order, productsReq) {
    console.log(orderId, order, productsReq);
    order.order.totalPrice = 0;
    const productsCalc = productsReq.map((product) => {
      let pricePerSize = 0;
      const sizeToOrder = product.sizeToOrder;
      if (product.Price.priceType === 'weight') {
        if (product.Price.SizePrices[0].size) {
          pricePerSize =
            (sizeToOrder / 100) * product.Price.SizePrices[0].amount;
        } else {
          throw new Error('product size must be = 100');
        }
      } else if (product.Price.priceType === 'box') {
        if (product.Price.SizePrices.length > 0) {
          const [size] = product.Price.SizePrices.filter(
            (sizePrice) => sizePrice.size === sizeToOrder
          );
          pricePerSize = size.amount;
        } else {
          throw new Error('product size empty');
        }
      } else if (product.Price.priceType === 'unit') {
        if (product.Price.SizePrices[0].size > 0) {
          pricePerSize =
            product.Price.SizePrices[0].amount *
            (sizeToOrder / product.Price.SizePrices[0].size);
        } else {
          throw new Error('product size need big from 0');
        }
      }
      product.pricePerSize = pricePerSize;
      order.order.totalPrice
        ? (order.order.totalPrice += pricePerSize)
        : (order.order.totalPrice = pricePerSize);
      return product;
    });
    console.log('productsCalc', productsCalc);
    order.order.products = [...productsCalc];
    order.order.Tax = +(order.order.totalPrice * 0.17).toFixed(2);
    order.order.unTax = +(order.order.totalPrice * 0.83).toFixed(2);
    order.order.totalPrice = +order.order.totalPrice.toFixed(2);
    console.log('order', order);
    await db.Order.update(
      { order: JSON.stringify(order.order) },
      {
        where: {
          id: orderId,
        },
      }
    );
    const { products, ...userDetails } = order.order;
    const htmlForEmail = buildHtml(orderId, userDetails, order.order);
    const bufferPdf = buildPdf(orderId, userDetails, order.order);
    await emailService.sendMail(
      'עדכון הזמנה קייטרינג גבאי',
      htmlForEmail,
      userDetails.email,
      bufferPdf,
      orderId
    );
  }
}

module.exports = CartService;
