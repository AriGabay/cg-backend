require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs')

var transporter = nodemailer.createTransport({
  // service: 'Gmail',
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
// transporter.sendMail({
//   from: 'sender@example.com',
//   to: 'recipient@example.com',
//   subject: 'Message',
//   text: 'I hope this message gets through!',
//   auth: {
//     user: 'user@example.com',
//     refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
//     accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
//     expires: 1484314697598
//   }
// });

async function sendMail(subject, html, to, orderId) {
  subject = 'הזמנה קייטרינג גבאי';
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    cc: process.env.MAIL_USERNAME,
    subject,
    text: 'הזמנה קייטרינג גבאי',
    html: html,
    attachments: [{
      filename: `order-${orderId}.pdf`,
      path: `${process.cwd()}/pdfs/order-${orderId}.pdf`,
      contentType: 'application/pdf'
    }],
    auth: {
      user: process.env.MAIL_USERNAME,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      expires: 1484314697598
    }
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log('Error' + err);
    } else {
      console.log('Email Sent');
      fs.promises.readdir(`${process.cwd()}/pdfs`)
        .then((f) => Promise.all(f.map(e => fs.promises.unlink(`${process.cwd()}/pdfs/${e}`))))
    }
  });
}
module.exports = {
  sendMail
};
