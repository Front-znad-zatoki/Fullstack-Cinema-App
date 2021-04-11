import { PRICE_NORMAL } from '../../../actions/types';

function TicketChosen({ seat, price }) {
  const isNormalPrice = seat.price === PRICE_NORMAL;
  return (
    <li className="ticket">
      <h3 className="ticket__heading">CHOSEN SEAT: {seat.seatName}</h3>
      <div className="ticket__box">
        <p className="ticket__type">{isNormalPrice ? 'Normal' : 'Reduced'}</p>
        <p className="ticket__price">
          {isNormalPrice
            ? `${price.normal.toFixed(2)} ZL`
            : `${price.reduced.toFixed(2)} ZL`}
        </p>
      </div>
    </li>
  );
}

export default TicketChosen;
