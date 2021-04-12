import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CinemaHall from '../../components/CinemaHall';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';
import Ticket from '../../components/Ticket';
import { ReservationContext } from '../../context/Reservation';

function ReservationView({ match }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats } = reservation;
  const { cinemaHallId, startDate, _id } = reservation.screening;
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
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <CinemaHall />
      <ul className="ticket__list">
        {/* TODO: get occupied seats by action */}
        {selectedSeats
          ? selectedSeats.map(({ seatNr, price, row, column }) => {
              return <Ticket key={seatNr} seatNr={seatNr} price={price} />;
            })
          : null}
      </ul>
      <ul className="button__group">
        <button onClick={handleGoBack}>Go Back</button>
        <button disabled={selectedSeats.length === 0} onClick={handleProceed}>
          Proceed with Reservation
        </button>
      </ul>
    </div>
  );
}

export default ReservationView;
