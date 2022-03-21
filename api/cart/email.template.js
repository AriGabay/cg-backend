const buildHtml=(orderAfterSave,userDetails,cart)=>{
    let htmlForEmail =`
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
          font-size: medium;
          font-weight: 300;
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
        htmlForEmail += `<tr class="item">
      <td>
      ${product.displayName} <br>
      </td>
      <td>${checkPriceType(product)}</td>
      <td>${product.pricePerSize.toFixed(2)} ₪</td>
  </tr>
      `;
    });
    htmlForEmail += `<tr class="total">
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

let htmlForPdf =`
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
      padding-bottom: 2.5rem;
  }

  .invoice-box {
      width: 67%;
      padding-right:30px;
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
      letter-spacing: 1.5px;
      font-size: .50rem;
      height: 1.4rem;
      width: 35%;
    }
    
    .invoice-box table tr.item td {
        border-bottom: 1px dotted #717885;
        padding: 0.25rem 0 1rem 0;
        width: 35%;
  }

  .invoice-box table tr:nth-last-child(-n+2) td {
      border-bottom: 0px;
      padding: 0.25rem 0 1rem 0;
  }

  .invoice-box table tr.total td {
      border-top: 1px solid #717885;
      font-size: medium;
      font-weight: 300;
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
      width: calc(33% - 2rem);
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

  .title{
      padding-top:30px;
  }

</style>
</head>

<body>
<div id="content">
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
    htmlForPdf += `<tr class="item">
  <td>
  ${product.displayName} <br>
  </td>
  <td>${checkPriceType(product)}</td>
  <td>${product.pricePerSize.toFixed(2)} ₪</td>
</tr>
  `;
});
htmlForPdf += `<tr class="total">
<td>סיכום הזמנה</td>
<td class="oneContainer"> </td>
<td class="ThirdContainer">מחיר משוער :</td>
<td>${cart.totalPrice}₪</td>
</tr>
<tr>
<td style="font-size: medium;">
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
</div>
</body>
</html>` 
return {htmlForEmail,htmlForPdf}
}

const checkPriceType=(product)=> {
    if (product.Price.priceType === 'box') {
      return `קופסה ${product.sizeToOrder} גרם`;
    } else if (product.Price.priceType === 'unit') {
      return `יחידות ${product.sizeToOrder}`;
    } else if (product.Price.priceType === 'weight') {
      return `${product.sizeToOrder} גרם`;
    }
  }

module.exports = {
    buildHtml
  };