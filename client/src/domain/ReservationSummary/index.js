import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { ReservationContext } from '../../context/Reservation';
import TicketChosen from '../../components/Ticket/TicketChosen';
import ReservationForm from './ReservationForm';
import ScreeningDetails from '../../components/ScreeningDetails';

function ReservationSummary() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation } = useContext(ReservationContext);
  const { selectedSeats } = reservation;
  const { price, cinemaHallId, startDate } = reservation.screening;

  const { movieDetails } = reservation;
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();

  return (
    <div
      className="app-container reservation"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4>SUMMARY</h4>
      <div className="movie__view__details movie__list__item ">
        <ScreeningDetails
          title={movieDetails.title}
          city={cinemaHallId.cinemaId.city}
          country={cinemaHallId.cinemaId.country}
          startDateFormatted={startDateFormatted}
          startTimeFormatted={startTimeFormatted}
        />
      </div>
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
