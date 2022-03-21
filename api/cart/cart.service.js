const db = require('../../models/index');
const emailService = require('../../services/email.service');
const nodeHtmlToImage = require('node-html-to-image')
const { buildHtml } = require('./email.template');

class CartService {
  async createOrder(cart) {
    try {
      if (!cart.length) return new Error('cart is empty !');
      const totalCart = {
        totalPrice: null,
        Tax: null,
        unTax: null,
        products: [],
        time: new Date()
      };

      cart.forEach((totalProductFromFront) => {
        const { sizeToOrder, product } = totalProductFromFront;
        if (product.Price.priceType === 'weight') {
          if (product.Price.SizePrices[0].size) {
            const pricePerSize = (sizeToOrder / 100) * product.Price.SizePrices[0].amount;
            totalCart.totalPrice += pricePerSize;
            const newProduct = { ...product, sizeToOrder, pricePerSize };
            newProduct.sizeToOrder = sizeToOrder;
            newProduct.pricePerSize = pricePerSize;
            totalCart.products.push(newProduct);
            return;
          } else {
            throw Error('product size must be = 100');
          }
        }
        if (product.Price.priceType === 'box') {
          if (product.Price.SizePrices.length > 0) {
            const [size] = product.Price.SizePrices.filter((sizePrice) => sizePrice.size === sizeToOrder);
            const pricePerSize = size.amount;
            totalCart.totalPrice += pricePerSize;
            const newProduct = { ...product, sizeToOrder, pricePerSize };
            newProduct.sizeToOrder = sizeToOrder;
            newProduct.pricePerSize = pricePerSize;
            totalCart.products.push(newProduct);
            return;
          } else {
            throw Error('product size empty');
          }
        }
        if (product.Price.priceType === 'unit') {
          if (product.Price.SizePrices[0].size > 0) {
            const pricePerSize = product.Price.SizePrices[0].amount * (sizeToOrder / product.Price.SizePrices[0].size);
            totalCart.totalPrice += pricePerSize;
            const newProduct = { ...product, sizeToOrder, pricePerSize };
            newProduct.sizeToOrder = sizeToOrder;
            newProduct.pricePerSize = pricePerSize;
            totalCart.products.push(newProduct);
            return;
          } else {
            throw Error('product size need big from 0');
          }
        }
      });
      totalCart.Tax = totalCart.totalPrice * 0.17;
      totalCart.Tax = Number(totalCart.Tax.toFixed(2));
      totalCart.unTax = totalCart.totalPrice * 0.83;
      totalCart.unTax = Number(totalCart.unTax.toFixed(2));
      totalCart.totalPrice = Number(totalCart.totalPrice.toFixed(2));
      return totalCart;
    } catch (error) {
      console.error('error:', error);
    }
  }

  async buildHtml(cart, userDetails) {
    try {
      const newObj = { ...userDetails, ...cart };
      const orderStr = JSON.stringify(newObj);
      const orderAfterSave = await db.Order.create({ order: orderStr });
      const {htmlForEmail,htmlForPdf} = buildHtml(orderAfterSave,userDetails,cart)
      const x = await nodeHtmlToImage({
        output: `./pdfs/order-${orderAfterSave.id}.png`,
        html: htmlForPdf,
        puppeteerArgs: { args: ["--no-sandbox"] },
      })
      console.log('x',x);
      await emailService.sendMail('הזמנה חדשה קייטרינג גבאי', htmlForEmail, userDetails.email,orderAfterSave.id,htmlForPdf);
      // smsService.sendSMS(`הזמנה חדשה נכנסה - ${orderAfterSave.id}`);
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
}

module.exports = CartService;
