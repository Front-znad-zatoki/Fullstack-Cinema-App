import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { ReservationContext } from '../../context/Reservation';
import { RESET_RESERVATION } from '../../actions/types';
import ScreeningDetails from '../../components/ScreeningDetails';

function ReservationConfirmation() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { orderDetails, movieDetails } = reservation;
  const { cinemaHallId, startDate } = reservation.screening;
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();
  const history = useHistory();
  const handleProceed = (event) => {
    event.preventDefault();
    dispatchReservation({ type: RESET_RESERVATION });
    history.push(`/`);
  };
  return (
    <div
      className="app-container reservation"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4>CONFIRMATION</h4>
      <div className="movie__view__details movie__list__item ">
        <ScreeningDetails
          title={movieDetails.title}
          city={cinemaHallId.cinemaId.city}
          country={cinemaHallId.cinemaId.country}
          startDateFormatted={startDateFormatted}
          startTimeFormatted={startTimeFormatted}
        />
      </div>
      <h5>Your reservation was made!</h5>
      <p>We sent an email to the adress you provided: {orderDetails.email}. </p>
      <p>You should get and email with the confirmation soon!</p>
      <p>Your order number: {orderDetails._id}</p>
      <div className="button__group">
        <button className="button--submit" onClick={handleProceed}>
          Back to Main Page
        </button>
      </div>
    </div>
  );
}

export default ReservationConfirmation;
