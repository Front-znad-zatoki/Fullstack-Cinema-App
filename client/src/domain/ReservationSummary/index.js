import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';
import { ReservationContext } from '../../context/Reservation';
import { AuthContext } from '../../context/Auth';
import Ticket from '../../components/Ticket';
import TicketChosen from '../../components/Ticket/TicketChosen';
import ReservationForm from './ReservationForm';

function ReservationSummary({ match }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats } = reservation;
  const { price } = reservation.screening;
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;

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
      <ReservationForm />
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
    </div>
  );
}

export default ReservationSummary;
