import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { ReservationContext } from '../../context/Reservation';
import { RESET_RESERVATION } from '../../actions/types';

function PreBooking() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails } = reservation;
  const { cinemaHallId, startDate, _id } = reservation.screening;
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/reservation/seats/${_id}`);
  };
  const handleGoBackClick = (event) => {
    event.preventDefault();
    dispatchReservation({ type: RESET_RESERVATION });
    history.push(`/`);
  };
  return (
    <div
      className="movie__view app-container prebooking"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <div className="movie__view__container">
        <img
          className="movie__view__container__image"
          src={movieDetails.poster}
          alt="Movie poster"
        />
      </div>
      <div className="movie__view__details movie__list__item">
        <h3>{movieDetails.title}</h3>
        <p>
          <strong>Cinema:</strong> {cinemaHallId.cinemaId.city},{' '}
          {cinemaHallId.cinemaId.country}
        </p>
        <p>
          <strong>Start Date:</strong>
          {startDateFormatted}, {startTimeFormatted}
        </p>
        <p>
          <strong>Duration:</strong> {movieDetails.duration} min
        </p>
        <p>
          <strong>Genre:</strong> {movieDetails.genre}
        </p>
        <div className="button__group">
          <button className="button--submit" onClick={handleGoBackClick}>
            Go Back
          </button>
          <button className="button--submit" onClick={handleClick}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreBooking;
