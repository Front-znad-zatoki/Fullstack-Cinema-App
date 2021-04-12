import React, { useContext, useEffect } from 'react';
import Seat from './Seat';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';
import { getOccupiedSeatsForScreening } from '../../actions/Reservation';
// TODO: check occupied seats

const CinemaHall = () => {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { cinemaHallId, _id } = reservation.screening;
  const { movieDetails, selectedSeats, occupiedSeats } = reservation;
  const nrOfRows = cinemaHallId.rows || 10;
  const nrOfColumns = cinemaHallId.columns || 10;
  const columns = [];
  const rowsInLetter = [];

  useEffect(() => {
    getOccupiedSeatsForScreening(_id, dispatchReservation);
  }, []);
  for (let i = 1; i <= nrOfColumns; i += 1) {
    columns.push(i);
  }
  for (let j = 1; j <= nrOfRows; j += 1) {
    rowsInLetter.push(String.fromCharCode(j + 64));
  }

  return (
    <div className="cinema__hall">
      <h2 className="cinema__hall__name">CINEMA HALL {cinemaHallId.name}</h2>
      <div className="cinema__hall__arrangement">
        <div className="cinema__hall__arrangement__screen">
          Screen this way!
        </div>
        <div className="cinema__hall__arrangement__seats">
          <ul>
            {rowsInLetter.map((row) => {
              return (
                <li className="cinema__hall__arrangement__seats__row" key={row}>
                  <p className="cinema__hall__arrangement__seats__row__name">
                    {row}
                  </p>
                  {columns.map((column) => {
                    return (
                      <Seat
                        key={`${row}${column}`}
                        seatNr={`${row}${column}`}
                        columnNr={column}
                        rowNr={row}
                      />
                    );
                  })}
                  <p className="cinema__hall__arrangement__seats__row__name">
                    {row}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CinemaHall;
