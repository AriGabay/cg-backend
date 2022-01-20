require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs/promises')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

async function sendMail(subject, html, to, orderId) {
  subject = 'הזמנה קייטרינג גבאי';
  // const pdfData = Buffer.concat(htmlForPdf,'utf-8')
  // console.log("pdfData", pdfData)
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    cc: process.env.MAIL_USERNAME,
    subject,
    text: 'הזמנה קייטרינג גבאי',
    html: html,
    attachments: [{
      filename: `order-${orderId}.pdf`,
      path: `${__dirname}/pdfs/order-${orderId}.pdf`,
      contentType: 'application/pdf'
    }],
    auth: {
      user: process.env.MAIL_USERNAME,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      expires: 1484314697598
    }
  };
  transporter.sendMail(mailOptions, async (err)=> {
    if (err) {
      console.log('Error' + err);
    } else {
      console.log('Email Sent');
      fs.promises.readdir(`${__dirname}/pdfs`)
        .then((f) => Promise.all(f.map(e => fs.promises.unlink(`${__dirname}/pdfs/${e}`))))
    }
  });
}
module.exports = {
  sendMail
};
