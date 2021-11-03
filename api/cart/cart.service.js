const db = require('../../models/index');
const emailService = require('../../services/email.service');
const smsService = require('../../services/smsWhatsapp.service');
const fs = require('fs');
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
            const pricePerSize = (sizeToOrder / product.Price.SizePrices[0].size) * product.Price.SizePrices[0].amount;
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
          if (product.Price.SizePrices.size > 0) {
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
      const shekel = '₪';
      const newObj = { ...userDetails, ...cart };
      const orderStr = JSON.stringify(newObj);
      const orderAfterSave = await db.Order.create({ order: orderStr });
      var html = `
      <div dir="rtl">
      <h1>היי, ${userDetails.firstName} ${userDetails.lastName}</h1>
      <h3>תודה שהזמנת מקייטרינג גבאי</h3>
      <h4>פרטי הזמנה:</h4>
      <p>שם פרטי : ${userDetails.firstName}</p>
      <p>שם משפחה : ${userDetails.lastName}</p>
      <p>מספר הזמנה : ${orderAfterSave.id}</p>
      <p>כתובת דואר אלקטרוני : ${userDetails.email}</p>
      <p>מספר פלאפון : ${userDetails.mobile}</p>
      <p>מספר פלאפון נוסף : ${userDetails.mobileTow}</p>
      <p>ת.ז : ${userDetails.idPersonal}</p>
      <p>עיר : ${userDetails.city}</p>
      <p>רחוב : ${userDetails.street}</p>
      <p>שעת איסוף : ${userDetails.pickup}</p>
      <p>תאריך איסוף : ${userDetails.pickUpDate}</p>
      `;
      cart.products.forEach((product) => {
        html += `<h3>${product.displayName}</h3>
        <p>מחיר:${product.pricePerSize.toFixed(2)}${shekel} </p>
        <p>תיאור מוצר: ${product.description}</p>
        `;
        const string = this.checkPriceType(product);
        html += string; //size Per Gram/Unit/weight
        html += `<img src='https://res.cloudinary.com/cgabay/image/upload/c_scale/w_200,h_200/v1614944384/${product.imgUrl}'/>`; //image
        html += '<hr />'; //End
      });
      html += `<h4>כמות מוצרים : ${cart.products.length}</h4>`;
      html += `<h4>מחיר משוער : ${cart.totalPrice}${shekel}</h4>`;
      html += `<h4>בברכה, קייטרינג גבאי בע"מ</h4>`;
      html += `</div>`; //End Html
      emailService.sendMail('הזמנה חדשה קייטרינג גבאי', html, userDetails.email);
      // smsService.sendSMS(`הזמנה חדשה נכנסה - ${orderAfterSave.id}`);
      html;
    } catch (error) {
      console.log('[BUILD_HTML] error:', error);
    }
  }
  checkPriceType(product) {
    if (product.Price.priceType === 'box') {
      return `<p>גודל: קופסה של  ${product.sizeToOrder} גרם </p>`;
    } else if (product.Price.priceType === 'unit') {
      return `<p>יחידות: ${product.sizeToOrder} </p>`;
    } else if (product.Price.priceType === 'weight') {
      return `<p>גודל: ${product.sizeToOrder} גרם </p>`;
    }
  }
}

module.exports = CartService;
