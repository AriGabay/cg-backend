require('dotenv').config();
const nodemailer = require('nodemailer');
const fsExtra = require('fs-extra')
const path = require('path')

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
  let directory = path.join(__dirname, `../pdfs/order-${orderId}.png`)
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    cc: process.env.MAIL_USERNAME,
    subject,
    text: 'הזמנה קייטרינג גבאי',
    html: html,
    attachments: [{
      path: directory,
      contentType: 'application/png'
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
      directory = path.join(__dirname, `../pdfs`)
      fsExtra.emptyDirSync(directory)
    }
  });
}
module.exports = {
  sendMail
};
