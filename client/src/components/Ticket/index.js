import React from 'react';

function Ticket({ seatNr, type }) {
  const priceRegular = '20';
  const priceDiscount = '10';
  return (
    <div className="ticket">
      <h4 className="ticket__heading">SEAT: {seatNr}</h4>

      <input type="radio" id="discount" name="ticketType" value="discount" />
      <label htmlFor="discount" className="ticket__label">
        <div className="ticket__details">
          <p className="ticket__type">DISCOUNT</p>
          <p className="ticket__price">{priceDiscount}</p>
        </div>
      </label>

      <input
        type="radio"
        id="regular"
        name="ticketType"
        value="regular"
        checked
      />
      <label htmlFor="regular">
        <div className="ticket__details">
          <p className="ticket__type">REGULAR</p>
          <p className="ticket__price">{priceRegular}</p>
        </div>
      </label>
    </div>
  );
}

export default Ticket;
