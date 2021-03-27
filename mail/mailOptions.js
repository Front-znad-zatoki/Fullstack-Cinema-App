const getMailOptions = (sendToAdress, subject, text) => ({
  from: 'frontznadzatoki@gmail.com',
  to: sendToAdress,
  subject: subject,
  text: text,
});
export default getMailOptions;
