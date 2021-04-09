import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import movies from '../../mock/moviesMock';
import screenigns from '../../mock/screeningsMock';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';

function PreBooking({ match }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  // TODO: add context to retrieve info about screening data
  // MOCK BELOW, REMOVE AFTER CONTEXT FOR REERVATION IS READY
  const { title, movieId, cinemaHallId, startDate, id } = screenigns[0];
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();

  const history = useHistory();
  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/reservation/seats/${id}`);
  };
  return (
    <div
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <div className="movie__view__container">
        <img
          className="movie__view__container__image"
          src={movieId.poster}
          alt="Movie poster"
        />
      </div>
      <div className="movie__view__details">
        <h3>{movieId.title}</h3>
        <p>
          <strong>Cinema:</strong> {cinemaHallId.cinemaId.city},{' '}
          {cinemaHallId.cinemaId.country}
        </p>
        <p>
          <strong>Start Date:</strong>
          {startDateFormatted}, {startTimeFormatted}
        </p>
        <div className="button__group">
          <Link to="/">Go Back to Repertoire</Link>
          <button onClick={handleClick}>Proceed with Reservation</button>
        </div>
      </div>
    </div>
  );
}

export default PreBooking;
