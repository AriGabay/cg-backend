const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable');
const { fontBase64 } = require('../../assets/font.js');
autoTable.applyPlugin(jsPDF);

const buildPdf = (orderId, userDetails, cart) => {
  try {
    const doc = new jsPDF({ unit: 'px' });
    doc.setR2L(true);

    doc.addFileToVFS('David-Libre.ttf', fontBase64);
    doc.addFont('David-Libre.ttf', 'David', 'normal');
    doc.addFont('David-Libre.ttf', 'David', 'bold');
    doc.setFont('David', 'normal');

    const rows = buildRow(cart);
    const maxRightPage = 320;
    const topPage = 10;
    doc.setFontSize(25);
    doc.text('סיכום הזמנה קייטרינג גבאי', maxRightPage - 180, topPage + 20);
    doc.setFontSize(15);
    doc.text('פרטים :', maxRightPage + 10, topPage + 40);
    doc.setFontSize(12);
    const rowDetails = [
      [`${fix(orderId ? `${orderId}` : '')}`, 'מספר הזמנה :'],
      [`${userDetails.firstName} ${userDetails.lastName}`, 'שם מלא :'],
      [fix(userDetails.mobile), 'פלאפון :'],
      [fix(userDetails.mobileTow), 'פלאפון נוסף :'],
      [fix(userDetails.email), 'מייל :'],
      [fix(userDetails.idPersonal), 'תעודת זהות :'],
      [userDetails.city, 'עיר :'],
      [userDetails.street, `רחוב :`],
      [fix(userDetails.pickUpDate), 'תאריך איסוף :'],
      [fix(userDetails.pickup), 'שעת איסוף :'],
    ];

    doc.autoTable({
      body: rowDetails,
      styles: { font: 'David', halign: 'right', cellWidth: 'wrap' },
      startY: topPage + 50,
      margin: { left: 210, right: 210 },
      tableWidth: 150,
    });
    doc.autoTable({
      head: [[`מחיר`, `כמות`, `מוצר`]],
      body: rows,
      styles: { font: 'David', halign: 'right', cellWidth: 'wrap' },
      startY: 250,
    });
    const arrayBuffer = doc.output('arraybuffer');
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.log('Error try:', error);
  }
};

const buildRow = (cart) => {
  const rows = cart.products.map((product) => {
    return [
      fix(`${product.pricePerSize.toFixed(2)} ₪`),
      checkPriceType(product),
      product.displayName,
    ];
  });
  rows.push([fix(`${cart.totalPrice.toFixed(2)} ₪`), '', 'סה״כ']);
  return rows;
};
const fix = (str) => {
  if (typeof str === 'string') {
    return str.split('').reverse().join('');
  }
  return str;
};

const checkPriceType = (product) => {
  if (product.Price.priceType === 'box') {
    if (product.categoryId === 1 || product.categoryId == '1') {
      return `קופסה של ${product.sizeToOrder} מליליטר`;
    }
    return `קופסה של ${product.sizeToOrder} גרם`;
  } else if (product.Price.priceType === 'unit') {
    return `יחידות ${product.sizeToOrder}`;
  } else if (product.Price.priceType === 'weight') {
    return `${product.sizeToOrder} גרם`;
  }
};

module.exports = {
  buildPdf,
};
