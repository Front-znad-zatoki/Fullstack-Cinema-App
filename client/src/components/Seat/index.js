import React, { useContext, useState } from 'react';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';
import { PRICE_NORMAL } from '../../actions/types';

const Seat = ({ rowNr, columnNr, seatNr }) => {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const [occupied, setOccupied] = useState(false);
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    const seatWasSelected = reservation.selectedSeats.find((seat, index) => {
      return seat.seatName === seatNr;
    });
    // if (reservation.selectedSeats.includes(e.target.name)) {
    if (seatWasSelected) {
      dispatchReservation({ type: 'REMOVE_SEAT', payload: seatNr });
      dispatchReservation({ type: 'REMOVE_TICKET', payload: 1 });
    } else {
      dispatchReservation({
        type: 'ADD_SEAT',
        payload: {
          seatName: seatNr,
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
      className={occupied ? 'hall__seat occupied' : 'hall__seat'}
      onClick={handleSeatSelected}
    >
      {columnNr}
    </button>
  );
};

export default Seat;
