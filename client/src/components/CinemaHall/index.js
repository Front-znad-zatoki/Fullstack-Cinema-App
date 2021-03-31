/* eslint-disable no-plusplus */
import React, { useContext } from 'react';
import Seat from '../Seat';
import './style.scss';
import ReservationProvider from '../../context/Reservation';

const CinemaHall = () => {
  const nrOfRows = 7;
  const nrOfColumns = 8;
  const columns = [];
  const rowsInLetter = [];

  for (let i = 1; i <= nrOfColumns; i++) {
    columns.push(i);
  }
  for (let j = 1; j <= nrOfRows; j++) {
    rowsInLetter.push(String.fromCharCode(j + 64));
  }

  return (
    <ReservationProvider>
      <div>
        <div className="cinema__hall__screen">Screen this way!</div>
        <ul>
          {rowsInLetter.map((row) => {
            return (
              <li className="cinema__hall__row" key={row}>
                <div>{row}</div>
                {columns.map((column) => {
                  return (
                    <Seat
                      key={`${row}${column}`}
                      seatNr={`${row}${column}`}
                      columnNr={column}
                    />
                  );
                })}
                <div>{row}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </ReservationProvider>
  );
};
export default CinemaHall;
