const getOrderOptions = (sendToAdress, wasSuccessful, orderNr) => ({
  from: 'frontznadzatoki@gmail.com',
  to: sendToAdress,
  subject: `Order ${wasSuccessful ? 'Success' : 'Fail'}`,
  text: `Your order nr ${orderNr} was ${
    wasSuccessful ? 'successfully' : 'not'
  } placed`,
});
export default getOrderOptions;
