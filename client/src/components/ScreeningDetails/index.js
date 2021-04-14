import './style.scss';
import { useContext } from 'react';
import { ReservationContext } from '../../context/Reservation';

function ScreeningDetails() {
  const { reservation } = useContext(ReservationContext);
  const { movieDetails } = reservation;
  const { cinemaHallId, startDate } = reservation.screening;
  const startDateFormatted = new Date(startDate).toLocaleDateString();
  const startTimeFormatted = new Date(startDate).toLocaleTimeString();
  console.log(reservation);
  return (
    <div className="screening__container">
      <h3 className="screening__header">
        {movieDetails.title}, {cinemaHallId.cinemaId.city}
      </h3>
      <p>
        <strong>Start Date:</strong>
        {startDateFormatted}, {startTimeFormatted}
      </p>
    </div>
  );
}

export default ScreeningDetails;
