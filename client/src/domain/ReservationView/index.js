import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CinemaHall from '../../components/CinemaHall';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import Ticket from '../../components/Ticket';
import { ReservationContext } from '../../context/Reservation';
import ScreeningDetails from '../../components/ScreeningDetails';
import './style.scss';

import { RESET_RESERVATION } from '../../actions/types';

function ReservationView() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation } = useContext(ReservationContext);
  const { selectedSeats } = reservation;
  const { cinemaHallId, startDate, _id } = reservation.screening;
  const { movieDetails } = reservation;
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();
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
      <div className="movie__view__details movie__list__item ">
        <ScreeningDetails
          title={movieDetails.title}
          city={cinemaHallId.cinemaId.city}
          country={cinemaHallId.cinemaId.country}
          startDateFormatted={startDateFormatted}
          startTimeFormatted={startTimeFormatted}
        />
      </div>
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
          Proceed
        </button>
      </ul>
    </div>
  );
}

export default ReservationView;
