import transporter from './transporter.js';
import getMailOptions from './mailOptions.js';

const sendEmail = (email, orderId, text) => {
  const emailOptions = getMailOptions(
    email,
    `Order ${text}`,
    `Your order number: ${orderId} was ${text}`,
  );
  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export default sendEmail;
