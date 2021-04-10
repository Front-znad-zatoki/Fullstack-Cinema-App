import React, { useContext } from 'react';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';

const Seat = ({ columnNr, seatNr }) => {
  const { reservation, dispatchReservation } = useContext(ReservationContext);

  const occupied = false;
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    if (reservation.selectedSeats.includes(e.target.name)) {
      dispatchReservation({ type: 'REMOVE_SEAT', payload: e.target.name });
      dispatchReservation({ type: 'REMOVE_TICKET', payload: 1 });
    } else {
      dispatchReservation({ type: 'ADD_SEAT', payload: e.target.name });
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
