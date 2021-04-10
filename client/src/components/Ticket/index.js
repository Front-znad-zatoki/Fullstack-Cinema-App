import React from 'react';

function Ticket({ seatNr, type, price }) {
  return (
    <div className="ticket">
      <h4 className="ticket__heading">{seatNr}</h4>
      <div className="ticket__details">
        <p className="ticket__type">{type}</p>
        <p className="ticket__price">{price.normal}</p>
      </div>
    </div>
  );
}

export default Ticket;
