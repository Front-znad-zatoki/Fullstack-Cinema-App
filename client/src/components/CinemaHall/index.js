/* eslint-disable no-plusplus */
import React, { useContext } from 'react';
import Seat from '../Seat';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';
import cinemaHalls from '../../mock/cinemaHallMock';

const CinemaHall = () => {
  // const [reservation, dispatch] = useContext(ReservationContext);
  // dispatch({ type: 'ADD_CINEMAHALL_ID', payload: cinemaHalls[0].id });
  console.log(cinemaHalls[0].rows);
  const nrOfRows = cinemaHalls[0].rows;
  const nrOfColumns = cinemaHalls[0].columns;
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
