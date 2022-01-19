const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (body) => {
  client.messages
  .create({
    body,
    from: 'whatsapp:+14155238886',
    to: process.env.MY_PHONE_NUMBER,
    })
    .then((message) => console.log(message.sid))
    .done();
};

module.exports = {
  sendSMS,
};
