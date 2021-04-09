import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';

function ReservationConfirmation({ match }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  // TODO: add context to retrieve info about screening data
  // MOCK BELOW, REMOVE AFTER CONTEXT FOR REERVATION IS READY
  const { title, movieId, cinemaHallId, startDate, id } = screenigns[0];
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();

  const history = useHistory();
  const handleProceed = (event) => {
    event.preventDefault();
    history.push(`/`);
  };
  return (
    <div
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      Rendering Reservation Confirmation
      <h5>Your reservation was made!</h5>
      <p>You should get and email with the confirmation soon!</p>
      <div className="button__group">
        <button onClick={handleProceed}>Back to Main Page</button>
      </div>
    </div>
  );
}

export default ReservationConfirmation;
