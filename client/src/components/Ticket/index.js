import React, { useState } from 'react';
import './style.scss';

function Ticket({ seatNr = '3D', price = '10' }) {
  const [type, setType] = useState('none');
  return (
    <div className="ticket">
      <h4 className="ticket__heading">SEAT: {seatNr}</h4>
      <div className="ticket__details">
        <button
          type="button"
          disabled={type === 'discount'}
          className={
            type === 'discount' ? 'ticket__button selected' : 'ticket__button'
          }
          onClick={() => setType('discount')}
        >
          <p
            className={
              type === 'discount' ? 'ticket__type selected' : 'ticket__type'
            }
          >
            DISCOUNT
          </p>
          <p
            className={
              type === 'discount' ? 'ticket__price selected' : 'ticket__price'
            }
          >
            {price}
          </p>
        </button>
        <button
          type="button"
          disabled={type === 'regular'}
          className={
            type === 'regular' ? 'ticket__button selected' : 'ticket__button'
          }
          onClick={() => setType('regular')}
        >
          <p
            className={
              type === 'regular' ? 'ticket__type selected' : 'ticket__type'
            }
          >
            REGULAR
          </p>
          <p
            className={
              type === 'regular' ? 'ticket__price selected' : 'ticket__price'
            }
          >
            {price}
          </p>
        </button>
      </div>
    </div>
  );
}

export default Ticket;
