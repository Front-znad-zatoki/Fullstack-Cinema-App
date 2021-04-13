import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CinemaHall from '../../components/CinemaHall';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import Ticket from '../../components/Ticket';
import { ReservationContext } from '../../context/Reservation';
import './style.scss';

function ReservationView() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation } = useContext(ReservationContext);
  const { selectedSeats } = reservation;
  const { _id } = reservation.screening;
  const history = useHistory();
  const handleProceed = (event) => {
    event.preventDefault();
    history.push(`/reservation/summary/${_id}`);
  };
  const handleGoBack = (event) => {
    event.preventDefault();
    history.push(`/prebooking/${_id}`);
  };
  return (
    <div
      className="reservation__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <CinemaHall />
      {selectedSeats.length > 0 ? (
        <h2 className="cinema__hall__name">Selected tickets</h2>
      ) : null}
      <ul className="ticket__list">
        {selectedSeats
          ? selectedSeats.map(({ seatNr, price, row, column }) => {
              return <Ticket key={seatNr} seatNr={seatNr} price={price} />;
            })
          : null}
      </ul>
      <ul className="button__group">
        <button className="button--submit" onClick={handleGoBack}>
          Go Back
        </button>
        <button
          className="button--submit"
          disabled={selectedSeats.length === 0}
          onClick={handleProceed}
        >
          Proceed with Reservation
        </button>
      </ul>
    </div>
  );
}

export default ReservationView;
