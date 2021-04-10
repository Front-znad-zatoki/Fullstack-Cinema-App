/* eslint-disable no-plusplus */
import React, { useContext, useEffect } from 'react';
import Seat from '../Seat';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';

const CinemaHall = () => {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { cinemaHallId } = reservation;
  const nrOfRows = 8;
  const nrOfColumns = 7;
  const columns = [];
  const rowsInLetter = [];

  for (let i = 1; i <= nrOfColumns; i++) {
    columns.push(i);
  }
  for (let j = 1; j <= nrOfRows; j++) {
    rowsInLetter.push(String.fromCharCode(j + 64));
  }

  return (
    <div>
      <div className="cinema__hall__screen">Screen this way!</div>
      <ul>
        {rowsInLetter.map((row) => {
          return (
            <li className="cinema__hall__row" key={row}>
              <p>{row}</p>
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
              <p>{row}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CinemaHall;
