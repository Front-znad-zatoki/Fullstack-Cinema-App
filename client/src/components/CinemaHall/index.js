/* eslint-disable no-plusplus */
import React, { useContext, useEffect } from 'react';
import Seat from '../Seat';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
// import useFetchedData from '../../hooks/useFetchedData';
import { getHallScreeningsByHallId } from '../../actions/Hall';
import { MoviesContext } from '../../context/Movies';

const CinemaHall = () => {
  const { reservation, dispatch } = useContext(ReservationContext);
  const { cinemaHall } = reservation;
  // const { screenings, setScreenings } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  // const mongoCinemaHall = useFetchedData('api/cinemahalls');
  useEffect(() => {
    getHallScreeningsByHallId(
      cinemaHall.id,
      dispatch({
        type: 'SUCCESS_CINEMAHALL',
        payload: cinemaHall,
      }),
    );
  }, [cinemaHall]);

  // useEffect(() => {
  //   dispatch({
  // type: 'SUCCESS_CINEMAHALL',
  // payload: mongoCinemaHall[0],
  // });
  // }, [mongoCinemaHall]);
  const nrOfRows = cinemaHall.rows;
  const nrOfColumns = cinemaHall.columns;
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
