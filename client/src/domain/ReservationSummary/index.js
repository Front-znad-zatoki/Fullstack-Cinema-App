import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { ReservationContext } from '../../context/Reservation';
import TicketChosen from '../../components/Ticket/TicketChosen';
import ReservationForm from './ReservationForm';

function ReservationSummary() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation } = useContext(ReservationContext);
  const { selectedSeats } = reservation;
  const { price } = reservation.screening;

  return (
    <div
      className="app-container reservation"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4>SUMMARY</h4>
      {/* <ScreeningDetails /> */}
      <ul className="ticket__list movie__view__list">
        {selectedSeats
          ? selectedSeats.map((seat) => {
              return (
                <TicketChosen key={seat.seatName} price={price} seat={seat} />
              );
            })
          : null}
      </ul>
      <ReservationForm />
    </div>
  );
}

export default ReservationSummary;
