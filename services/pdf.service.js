// const PdfTable = require('voilab-pdf-table');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const doc = new PDFDocument();
// doc.pipe(fs.createWriteStream('pdfFolder/file1.pdf')); // write to PDF

const PDFDocument = require('pdfkit');
const fs = require('fs');

var pdfDoc = new PDFDocument();
pdfDoc.pipe(fs.createWriteStream('pdfFolder/SampleDocument.pdf'));

// pdfDoc.text('From Mon-Sat we will have a 10% discount on selected items!', 150, 150);
// pdfDoc.fillColor('red').fontSize(17).text('20%', 305, 150);
const cart = [
  {
    displayName: 'dotan',
    price: 20,
    order: {
      amount: 20,
      size: 'box',
    },
  },
  {
    displayName: 'shaked',
    price: 40,
    order: {
      amount: 200,
      size: 'unit',
    },
  },
];
writeTable(cart);
function writeTable(cart) {
  cart.map((product) => {
    pdfDoc.text('product name:' + ' ' + product.displayName);
    pdfDoc.text('price:' + ' ' + product.price);
    pdfDoc.text('amount:' + ' ' + product.order.amount);
    pdfDoc.text('sizes:' + ' ' + product.order.size);
  });
}

pdfDoc.end();
