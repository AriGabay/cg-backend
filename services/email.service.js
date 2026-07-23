require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// בדיקת חיבור ואימות מול Gmail בעליית השרת. לא שולחת מייל - רק מתחברת.
// נכשל בשקט בעבר: app password שפג תוקפו התגלה רק כשלקוח לא קיבל אישור הזמנה.
async function verifyMailConnection() {
  if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    console.error(
      '❌ [MAIL] MAIL_USERNAME או MAIL_PASSWORD חסרים ב-.env — לא יישלחו מיילים!'
    );
    return false;
  }
  try {
    await transporter.verify();
    console.log('✅ [MAIL] חיבור ל-Gmail תקין');
    return true;
  } catch (error) {
    if (error.code === 'EAUTH') {
      console.error(
        '❌ [MAIL] Gmail דחה את פרטי ההתחברות (EAUTH). ה-App Password כנראה בוטל או פג.\n' +
          '   יש ליצור App Password חדש ב-https://myaccount.google.com/apppasswords\n' +
          '   ולעדכן את MAIL_PASSWORD בקובץ .env. עד אז לא יישלחו מיילים ללקוחות!'
      );
    } else {
      console.error('❌ [MAIL] בדיקת החיבור ל-Gmail נכשלה:', error.message);
    }
    return false;
  }
}

async function sendMail(subject, html, to, pdfBuffer, orderId) {
  try {
    // כתובת העסק יושבת ב-cc, ולכן כתובת לקוח ריקה או פגומה לא גורמת לשגיאה:
    // nodemailer פשוט שולח ל-cc בלבד ומדווח על הצלחה. זו בדיוק התקלה שבה
    // המייל הגיע רק לעסק. עדיף להיכשל בגלוי מאשר "להצליח" בלי הלקוח.
    const customerEmail = typeof to === 'string' ? to.trim() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      throw new Error(
        `כתובת המייל של הלקוח חסרה או לא תקינה (${JSON.stringify(to)}) ` +
          `בהזמנה ${orderId} — המייל לא נשלח.`
      );
    }
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: customerEmail,
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
    };
    const info = await transporter.sendMail(mailOptions);
    // מתעד מי באמת התקבל בשרת של Gmail, כדי שלא נצטרך לנחש שוב.
    console.log(
      `[MAIL] הזמנה ${orderId} | התקבלו: ${
        (info.accepted || []).join(', ') || 'אף אחד'
      }${
        (info.rejected || []).length
          ? ` | נדחו: ${info.rejected.join(', ')}`
          : ''
      } | ${info.messageId}`
    );
    if ((info.rejected || []).length) {
      console.error(
        `[MAIL] שרת הדואר דחה נמענים בהזמנה ${orderId}:`,
        info.rejected.join(', '),
        '|',
        info.response
      );
    }
    return info;
  } catch (error) {
    console.error('[Error-send email]: ', error);
    throw error;
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
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email Sent', info.messageId);
    return info;
  } catch (error) {
    console.error('[Error-send email]: ', error);
    throw error;
  }
}

module.exports = {
  sendMail,
  sendMailGn,
  verifyMailConnection,
};
