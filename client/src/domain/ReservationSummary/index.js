import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';
import { ReservationContext } from '../../context/Reservation';
import { AuthContext } from '../../context/Auth';
import Ticket from '../../components/Ticket';
import TicketChosen from '../../components/Ticket/TicketChosen';

function ReservationSummary({ match }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats } = reservation;
  const { cinemaHallId, startDate, _id, price } = reservation.screening;
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  console.log(selectedSeats);
  console.log(user);
  const history = useHistory();
  const handleProceed = (event) => {
    event.preventDefault();
    history.push(`/reservation/confirmation`);
  };
  const handleGoBack = (event) => {
    event.preventDefault();
    history.push(`/reservation/seats/${_id}`);
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
      <ul className="ticket__list">
        {selectedSeats
          ? selectedSeats.map((seat) => {
              return (
                <TicketChosen key={seat.seatName} price={price} seat={seat} />
              );
            })
          : null}
      </ul>
      <h5>Add tickets</h5>
      <div className="button__group">
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleProceed}>Confirm your reservation</button>
      </div>
    </div>
  );
}

export default ReservationSummary;
