import './style.scss';
import { useContext, useState } from 'react';
import { ReservationContext } from '../../context/Reservation';
import {
  PRICE_NORMAL,
  PRICE_REDUCED,
  UPDATE_TICKET_PRICE,
} from '../../actions/types';

function Ticket({ seatNr, type }) {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats, screening } = reservation;
  const priceRegular = screening.price.normal.toString() || '50';
  const priceDiscount = screening.price.reduced.toString() || '25';
  const [chosenPrice, setchosenPrice] = useState(priceRegular);

  const handleChange = (event) => {
    console.log(reservation);
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
      <form>
        <input
          type="radio"
          id="discount"
          name="ticketType"
          value={priceDiscount}
          onChange={handleChange}
          checked={chosenPrice === priceDiscount}
        />
        <label htmlFor="discount" className="ticket__label">
          <div className="ticket__details">
            <p className="ticket__type">DISCOUNT</p>
            {/* <p className="ticket__price">{priceDiscount}</p> */}
          </div>
        </label>
        <input
          type="radio"
          id="regular"
          name="ticketType"
          value={priceRegular}
          onChange={handleChange}
          checked={chosenPrice === priceRegular}
        />
        <label htmlFor="regular">
          <div className="ticket__details">
            <p className="ticket__type">REGULAR</p>
            <p className="ticket__price">{priceRegular}</p>
          </div>
        </label>
      </form>
    </li>
  );
}

export default Ticket;
