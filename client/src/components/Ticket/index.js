import './style.scss';
import { useContext, useState } from 'react';
import { ReservationContext } from '../../context/Reservation';
import {
  PRICE_NORMAL,
  PRICE_REDUCED,
  UPDATE_TICKET_PRICE,
} from '../../actions/types';

function Ticket({ seatNr, type, price }) {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { screening } = reservation;
  const priceRegular = screening.price.normal.toString() || '50';
  const priceDiscount = screening.price.reduced.toString() || '25';

  const [chosenPrice, setchosenPrice] = useState(
    price === PRICE_REDUCED ? priceDiscount : priceRegular,
  );

  const handleChange = (event) => {
    setchosenPrice((prevPrice) => event.target.value);
    dispatchReservation({
      type: UPDATE_TICKET_PRICE,
      payload: {
        seatNr,
        price:
          event.target.value === screening.price.normal.toString()
            ? PRICE_NORMAL
            : PRICE_REDUCED,
      },
    });
  };
  return (
    <li className="ticket">
      <h3 className="ticket__heading">SEAT: {seatNr}</h3>
      <form className="ticket__price-form">
        <input
          type="radio"
          name="ticketType"
          value={priceDiscount}
          onChange={handleChange}
          checked={chosenPrice === priceDiscount}
          id={`${seatNr}${priceDiscount}`}
        />
        <label htmlFor={`${seatNr}${priceDiscount}`} className="ticket__label">
          <p className="ticket__type">DISCOUNT</p>
          <p className="ticket__price">{`${screening.price.reduced.toFixed(
            2,
          )} ZL`}</p>
        </label>
        <input
          type="radio"
          name="ticketType"
          value={priceRegular}
          onChange={handleChange}
          checked={chosenPrice === priceRegular}
          id={`${seatNr}${priceRegular}`}
        />
        <label htmlFor={`${seatNr}${priceRegular}`}>
          <p className="ticket__type">REGULAR</p>
          <p className="ticket__price">{`${screening.price.normal.toFixed(
            2,
          )} ZL`}</p>
        </label>
      </form>
    </li>
  );
}

export default Ticket;
