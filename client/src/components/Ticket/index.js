import './style.scss';
import { useContext, useState } from 'react';
import { ReservationContext } from '../../context/Reservation';

function Ticket({ seatNr, type }) {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats, screening } = reservation;
  const priceRegular = screening.price.normal || '50';
  const priceDiscount = screening.price.reduced || '25';
  const [chosenPrice, setchosenPrice] = useState(priceRegular);

  const handleChange = (event) => {
    // console.log(reservation);
    console.log(chosenPrice);
    setchosenPrice(event.target.value);
    console.log(chosenPrice);
  };
  return (
    <li className="ticket">
      <h3 className="ticket__heading">SEAT: {seatNr}</h3>
      <form>
        <label htmlFor="discount" className="ticket__label">
          <input
            type="radio"
            id="discount"
            name="ticketType"
            value={priceDiscount || ''}
            onChange={handleChange}
            checked={chosenPrice === priceDiscount}
          />

          <div className="ticket__details">
            <p className="ticket__type">DISCOUNT</p>
            <p className="ticket__price">{priceDiscount}</p>
          </div>
        </label>

        <label htmlFor="regular">
          <input
            type="radio"
            id="regular"
            name="ticketType"
            value={priceRegular || ''}
            checked={chosenPrice === priceRegular}
          />

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
