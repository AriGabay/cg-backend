require('dotenv').config();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
async function sendMail(subject, html, to) {
  console.log('to:', to);
  subject = 'ניסיון';
  const mailOptions = {
    from: 'gabay.catering@gmail.com',
    to,
    cc: 'gabay.catering@gmail.com',
    subject,
    text: 'הזמנה קייטרינג גבאי',
    html: html,
  };
  console.log('transporter', process.env.MAIL_USERNAME);
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log('Error' + err);
    } else {
      console.log('Email Sent');
    }
  });
}
module.exports = {
  sendMail,
};
