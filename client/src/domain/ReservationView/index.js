import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CinemaHall from '../../components/CinemaHall';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';

function ReservationView({ match }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  // TODO: add context to retrieve info about screening data
  // MOCK BELOW, REMOVE AFTER CONTEXT FOR REERVATION IS READY
  const { title, movieId, cinemaHallId, startDate, id, slug } = screenigns[0];
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();

  const history = useHistory();
  const handleProceed = (event) => {
    event.preventDefault();
    // TODO: check routes
    //   history.push(`/reservation/${id}`);
    history.push(`/reservation/summary/${id}`);
  };
  const handleGoBack = (event) => {
    event.preventDefault();
    // TODO: check routes
    history.push(`/prebooking/${id}`);
  };
  return (
    <div
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <p>Rendering Reservations View</p>
      <p>Put CinemaHall and Render tickets component accordingly</p>
      {/* <ScreeningDetails /> */}
      <CinemaHall />
      <ul>
        {/* reservation.tickets.map((ticket) => {
          return <Ticket key={seatNr} />
        }) */}
      </ul>
      <ul className="button__group">
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleProceed}>Proceed with Reservation</button>
      </ul>
    </div>
  );
}

export default ReservationView;
