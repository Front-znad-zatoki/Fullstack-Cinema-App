import React, { useContext, useState, useEffect } from 'react';
import './style.scss';
import { ReservationContext } from '../../../context/Reservation';
import { PRICE_NORMAL } from '../../../actions/types';

const Seat = ({ rowNr, columnNr, seatNr }) => {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats, occupiedSeats } = reservation;
  const [occupied, setOccupied] = useState(false);
  useEffect(() => {
    const isSeatOccupied = () => {
      if (occupiedSeats.length === 0) return false;
      const res = occupiedSeats.find((seat) => {
        return seat.seatNr === seatNr;
      });
      if (res) return true;
      return false;
    };
    const result = isSeatOccupied();
    setOccupied(result);
  }, [occupiedSeats]);
  const seatWasSelected = reservation.selectedSeats.find((seat, index) => {
    return seat.seatNr === seatNr;
  });

  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    if (seatWasSelected) {
      dispatchReservation({ type: 'REMOVE_SEAT', payload: seatNr });
      dispatchReservation({ type: 'REMOVE_TICKET', payload: 1 });
    } else {
      dispatchReservation({
        type: 'ADD_SEAT',
        payload: {
          seatNr,
          price: PRICE_NORMAL,
          row: rowNr.charCodeAt(0) - 64,
          column: columnNr,
        },
      });
      dispatchReservation({ type: 'ADD_TICKET', payload: 1 });
    }
  };
  return (
    <button
      name={seatNr}
      disabled={occupied}
      className={`${occupied ? 'hall__seat occupied' : 'hall__seat'} ${
        seatWasSelected ? 'selected' : ''
      }`}
      onClick={handleSeatSelected}
    >
      {columnNr}
    </button>
  );
};

export default Seat;
