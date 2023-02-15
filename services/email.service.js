require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

async function sendMail(subject, html, to, pdfBuffer, orderId) {
  try {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      cc: process.env.MAIL_USERNAME,
      subject,
      text: 'הזמנה קייטרינג גבאי',
      html: html,
      attachments: [
        {
          filename: `order-${orderId}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf',
        },
      ],
      auth: {
        user: process.env.MAIL_USERNAME,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        expires: 1484314697598,
      },
    };
    transporter.sendMail(mailOptions, async (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('Email Sent');
    });
  } catch (error) {
    console.error('[Error-send email]: ', error);
  }
}
async function sendMailGn(
  pdfBuffer,
  eventId,
  toEmailAddres = '',
  titleMail = ''
) {
  try {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: toEmailAddres
        ? [toEmailAddres, 'kgabayt@gmail.com']
        : 'kgabayt@gmail.com',
      cc: process.env.MAIL_USERNAME,
      subject: titleMail ? titleMail : 'תפריט אירוע חדש',
      text: 'תפריט אירוע חדש',
      attachments: [
        {
          filename: `event-${eventId}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf',
        },
      ],
      auth: {
        user: process.env.MAIL_USERNAME,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        expires: 1484314697598,
      },
    };
    transporter.sendMail(mailOptions, async (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('Email Sent');
    });
  } catch (error) {
    console.error('[Error-send email]: ', error);
  }
}

module.exports = {
  sendMail,
  sendMailGn,
};
