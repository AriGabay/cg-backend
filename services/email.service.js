require('dotenv').config();
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');

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


const bufferPdf = async (html, options) => {
  try {
    return new Promise((resolve, reject) => {
      pdf.create(html, options).toBuffer(function (err, buffer) {
        if (err) {
          return reject(err);
        }
        resolve(buffer);
      });
    });
  } catch (e) {
    console.log('ERROR [bufferPdf]:', e);
  }
};

async function sendMail(subject, html, to, orderId, htmlForPdf) {
  subject = 'הזמנה קייטרינג גבאי';
  const options = {
    format: 'A4',
    border: {
      top: '1cm',
      right: '2cm',
      bottom: '1cm',
      left: '2cm',
    },
  };
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    cc: process.env.MAIL_USERNAME,
    subject,
    text: 'הזמנה קייטרינג גבאי',
    html: html,
    attachments: [{
      filename: `order-${orderId}.pdf`,
      content: await bufferPdf(htmlForPdf, options),
      contentType: 'application/pdf'
    }],
    auth: {
      user: process.env.MAIL_USERNAME,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      expires: 1484314697598
    }
  };
  transporter.sendMail(mailOptions, async (err) => {
    if (err) {
      console.log('Error' + err);
    } else {
      console.log('Email Sent');

    }
  });
}
module.exports = {
  sendMail
};
