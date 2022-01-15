// const db = require('../../models/index');
// const emailService = require('../../services/email.service');
// const smsService = require('../../services/smsWhatsapp.service');
// const fs = require('fs');
// class CartService {
//   async createOrder(cart) {
//     try {
//       if (!cart.length) return new Error('cart is empty !');
//       const totalCart = {
//         totalPrice: null,
//         Tax: null,
//         unTax: null,
//         products: [],
//         time: new Date()
//       };

//       cart.forEach((totalProductFromFront) => {
//         const { sizeToOrder, product } = totalProductFromFront;
//         if (product.Price.priceType === 'weight') {
//           if (product.Price.SizePrices[0].size) {
//             console.log("🚀 ~ file: cart.service.js ~ line 22 ~ CartService ~ cart.forEach ~ sizeToOrder", sizeToOrder)
//             console.log("🚀 ~ file: cart.service.js ~ line 23 ~ CartService ~ cart.forEach ~ product.Price.SizePrices[0].size", product.Price.SizePrices[0].size)
//             console.log("🚀 ~ file: cart.service.js ~ line 24 ~ CartService ~ cart.forEach ~ product.Price.SizePrices[0].amount", product.Price.SizePrices[0].amount)
//             const pricePerSize = (sizeToOrder / 100) * product.Price.SizePrices[0].amount;
//             totalCart.totalPrice += pricePerSize;
//             const newProduct = { ...product, sizeToOrder, pricePerSize };
//             newProduct.sizeToOrder = sizeToOrder;
//             newProduct.pricePerSize = pricePerSize;
//             totalCart.products.push(newProduct);
//             return;
//           } else {
//             throw Error('product size must be = 100');
//           }
//         }
//         if (product.Price.priceType === 'box') {
//           if (product.Price.SizePrices.length > 0) {
//             const [size] = product.Price.SizePrices.filter((sizePrice) => sizePrice.size === sizeToOrder);
//             const pricePerSize = size.amount;
//             totalCart.totalPrice += pricePerSize;
//             const newProduct = { ...product, sizeToOrder, pricePerSize };
//             newProduct.sizeToOrder = sizeToOrder;
//             newProduct.pricePerSize = pricePerSize;
//             totalCart.products.push(newProduct);
//             return;
//           } else {
//             throw Error('product size empty');
//           }
//         }
//         if (product.Price.priceType === 'unit') {
//           if (product.Price.SizePrices[0].size > 0) {
//             const pricePerSize = product.Price.SizePrices[0].amount * (sizeToOrder / product.Price.SizePrices[0].size);
//             totalCart.totalPrice += pricePerSize;
//             const newProduct = { ...product, sizeToOrder, pricePerSize };
//             newProduct.sizeToOrder = sizeToOrder;
//             newProduct.pricePerSize = pricePerSize;
//             totalCart.products.push(newProduct);
//             return;
//           } else {
//             throw Error('product size need big from 0');
//           }
//         }
//       });
//       totalCart.Tax = totalCart.totalPrice * 0.17;
//       totalCart.Tax = Number(totalCart.Tax.toFixed(2));
//       totalCart.unTax = totalCart.totalPrice * 0.83;
//       totalCart.unTax = Number(totalCart.unTax.toFixed(2));
//       totalCart.totalPrice = Number(totalCart.totalPrice.toFixed(2));
//       return totalCart;
//     } catch (error) {
//       console.error('error:', error);
//     }
//   }

//   async buildHtml(cart, userDetails) {
//     try {
//       const shekel = '₪';
//       const newObj = { ...userDetails, ...cart };
//       const orderStr = JSON.stringify(newObj);
//       const orderAfterSave = await db.Order.create({ order: orderStr });
//       var html = `
//       <div dir="rtl">
//       <h1>היי, ${userDetails.firstName} ${userDetails.lastName}</h1>
//       <h3>תודה שהזמנת מקייטרינג גבאי</h3>
//       <h4>פרטי הזמנה:</h4>
//       <p>שם פרטי : ${userDetails.firstName}</p>
//       <p>שם משפחה : ${userDetails.lastName}</p>
//       <p>מספר הזמנה : ${orderAfterSave.id}</p>
//       <p>כתובת דואר אלקטרוני : ${userDetails.email}</p>
//       <p>מספר פלאפון : ${userDetails.mobile}</p>
//       <p>מספר פלאפון נוסף : ${userDetails.mobileTow}</p>
//       <p>ת.ז : ${userDetails.idPersonal}</p>
//       <p>עיר : ${userDetails.city}</p>
//       <p>רחוב : ${userDetails.street}</p>
//       <p>שעת איסוף : ${userDetails.pickup}</p>
//       <p>תאריך איסוף : ${userDetails.pickUpDate}</p>
//       `;
//       cart.products.forEach((product) => {
//         html += `<h3>${product.displayName}</h3>
//         <p>מחיר:${product.pricePerSize.toFixed(2)}${shekel} </p>
//         <p>תיאור מוצר: ${product.description}</p>
//         `;
//         const string = this.checkPriceType(product);
//         html += string; //size Per Gram/Unit/weight
//         html += `<img src='https://res.cloudinary.com/cgabay/image/upload/c_scale/w_200,h_200/v1614944384/${product.imgUrl}'/>`; //image
//         html += '<hr />'; //End
//       });
//       html += `<h4>כמות מוצרים : ${cart.products.length}</h4>`;
//       html += `<h4>מחיר משוער : ${cart.totalPrice}${shekel}</h4>`;
//       html += `<h4>בברכה, קייטרינג גבאי בע"מ</h4>`;
//       html += `</div>`; //End Html
//       emailService.sendMail('הזמנה חדשה קייטרינג גבאי', html, userDetails.email);
//       // smsService.sendSMS(`הזמנה חדשה נכנסה - ${orderAfterSave.id}`);
//       html;
//     } catch (error) {
//       console.log('[BUILD_HTML] error:', error);
//     }
//   }
//   checkPriceType(product) {
//     if (product.Price.priceType === 'box') {
//       return `<p>גודל: קופסה של  ${product.sizeToOrder} גרם </p>`;
//     } else if (product.Price.priceType === 'unit') {
//       return `<p>יחידות: ${product.sizeToOrder} </p>`;
//     } else if (product.Price.priceType === 'weight') {
//       return `<p>גודל: ${product.sizeToOrder} גרם </p>`;
//     }
//   }
// }

// module.exports = CartService;
const db = require('../../models/index');
const emailService = require('../../services/email.service');
const smsService = require('../../services/smsWhatsapp.service');
const fs = require('fs');
const puppeteer = require("puppeteer");
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
      const shekel = '₪';
      const newObj = { ...userDetails, ...cart };
      const orderStr = JSON.stringify(newObj);
      const orderAfterSave = await db.Order.create({ order: orderStr });
      var html = `
      <html dir="rtl">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        @font-face {
            font-family: 'IBM Plex Sans';
            src: url(IBMPlexSans-Regular.woff)
        }

        * {
            direction: rtl;
            text-align: right !important;

        }

        body {
            margin: 0;
            width: 100%;
            height: 100%;
            font-size: 0.75rem;
            line-height: 1.6em;
            font-family: 'IBM Plex Sans', sans-serif;
            color: #142132;
        }

        h1 {
            font-size: 2.3rem;
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 100;
            color: #142132;
        }

        a {
            color: #142132;
            text-decoration: none;
        }

        a:hover {
            color: #4537DE;
            text-decoration: none;
        }

        .header {
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;

        }

        .header img {
            border-radius: 8px;
            margin-left: auto;
            margin-right: auto;
            width: 90%;
        }

        .content {
            display: flex;
            flex-wrap: wrap;
        }

        .info {
            width: calc(33% - 2rem);
            border-top: 1px solid #717885;
            margin-right: 2rem;
            padding-top: .25rem;
        }

        .invoice-box {
            width: 67%;
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: right;
            padding-bottom: 40px;
        }

        .invoice-box table tr td:nth-child(1) {
            text-align: left;
        }

        .invoice-box table tr.heading td {
            border-bottom: 1px solid #717885;
            border-top: 1px solid #717885;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: .65rem;
            height: 1.8rem;
        }

        .invoice-box table tr.item td {
            border-bottom: 1px dotted #717885;
            padding: 0.25rem 0 1rem 0;
        }

        .invoice-box table tr:nth-last-child(-n+2) td {
            border-bottom: 0px;
            padding: 0.25rem 0 1rem 0;
        }

        .invoice-box table tr.total td {
            border-top: 1px solid #717885;
            font-size: larger;
            font-weight: bold;
        }


        .notes {
            width: 50%;
        }

        .company-info {
            margin-top: 10rem;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }

        .company-info-item {
            width: calc(33% - 1rem);
            padding-right: 1rem;
            margin-bottom: 0;
        }

        .form {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-top: 1rem;
        }

        .label {
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: .65rem;
        }

        .form-border {
            padding: 10px 0px;
            border-top: 1px solid #717885;
            border-bottom: 1px solid #717885;
            border-left: none;
            border-right: none;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 0.75rem;
            line-height: 1.6em;
        }

        .form-border:hover {
            border-bottom: 1px solid #4537DE;
            border-top: 1px solid #4537DE;
        }

        .form-border:focus-visible {
            padding: 10px;
        }

        .signature {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .oneContainer {
            empty-cells: show;
        }

        .towContainer {
            empty-cells: show;

        }

        .ThirdContainer {
            empty-cells: show;

        }

        .image {
            width: 70%;
        }

        .image img {
          width: 100%;
          object-fit: contain;
      }
      
    </style>
</head>

<body>
    <div class="title" style="padding-right: 30px;">
        <h1>הזמנה</h1>
    </div>

    <div class="content">
        <div class="info">
            <p>
                מספר הזמנה: ${orderAfterSave.id}<br>
            </p>
            <p class="label">לקוח:</p>
            <p>
            ${userDetails.firstName} ${userDetails.lastName}<br>
            ${userDetails.mobile.substring(0, 3)}-${userDetails.mobile.substring(3, userDetails.mobile.length + 1)}<br>
            ${userDetails.mobileTow.substring(0, 3)}-${userDetails.mobileTow.substring(3, userDetails.mobile.length + 1)}<br>
                ${userDetails.email}<br>
                ${userDetails.city}<br>
                ${userDetails.street}
            </p>

            <div class="image">
                <img
                    src="https://res.cloudinary.com/cgabay/image/upload/v1638650388/old_logo_rssqwk_lfwgno.png">
            </div>
        </div>


        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tbody>
                    <tr class="heading">
                        <td>שם המוצר</td>
                        <td>גודל</td>
                        <td>מחיר סופי</td>
                    </tr>

      `;
      cart.products.forEach((product) => {
        html += `<tr class="item">
        <td>
        ${product.displayName} <br>
        </td>
        <td>${this.checkPriceType(product)}</td>
        <td>${product.pricePerSize.toFixed(2)} ₪</td>
    </tr>
        `;
      });
      html += `<tr class="total">
      <td>סיכום הזמנה</td>
      <td class="oneContainer">
      <td class="ThirdContainer">מחיר משוער :</td>
      </td>
      <td>${cart.totalPrice} ₪</td>
  </tr>
  <tr>
      <td style="font-size: larger;">
          שעת איסוף : ${userDetails.pickup}<br>
          תאריך איסוף : ${userDetails.pickUpDate}<br>
      </td>
  </tr>

</tbody>

</table>
<div class="company-info">
<div class="company-info-item">
  <p>
      <strong>קייטרינג גבאי בע״מ</strong><br>
      גני איילון <br>
      המברג 10 טבריה <br>
  </p>
</div>
<div class="company-info-item">
  <p>
      <br>
      <a href="https://www.c-g1.com">www.c-g1.com</a><br>
      <a href="mailto:gabay.catering@gmail.com">gabay.catering@gmail.com</a>
  </p>
</div>

</div>
</div>
</div>
</body>
</html>`
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html);
await page.pdf({ path: `./pdfs/order-${orderAfterSave.id}.pdf`, format: "A4" ,margin: {
  top: '20px',
  bottom: '20px',
  right: '20px',
  left: '20px' }})
await page.close();
await browser.close();
      emailService.sendMail('הזמנה חדשה קייטרינג גבאי', html, userDetails.email,orderAfterSave.id);
      // smsService.sendSMS(`הזמנה חדשה נכנסה - ${orderAfterSave.id}`);
      html;
    } catch (e) {
      console.log('[BUILD_HTML] error:', e);
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
