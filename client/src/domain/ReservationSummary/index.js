import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';

function ReservationSummary({ match }) {
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
    history.push(`/reservation/confirmation`);
  };
  const handleGoBack = (event) => {
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
      Rendering ReservationSummary
      {/* <ScreeningDetails /> */}
      <h5> Add form</h5>
      <h5>Add tickets</h5>
      <div className="button__group">
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleProceed}>Confirm your reservation</button>
      </div>
    </div>
  );
}

export default ReservationSummary;
