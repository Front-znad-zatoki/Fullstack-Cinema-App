/* eslint-disable no-plusplus */
import React from 'react';
import Seat from '../Seat';

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
    <div>
      <ul>
        {rowsInLetter.map((row) => {
          return (
            <li key={row}>
              <p>{row}</p>
              {columns.map((column) => {
                return (
                  <Seat
                    key={`${row}${column}`}
                    id={`${row}${column}`}
                    seatNr={column}
                  />
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CinemaHall;
