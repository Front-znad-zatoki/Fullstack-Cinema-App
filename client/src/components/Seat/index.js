import React, { useState, useContext } from 'react';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';

const Seat = ({ columnNr, seatNr }) => {
  const [selectedSeats, setSelectedSeats] = useContext(ReservationContext);
  // TO DO gest variables from props
  const occupied = false;
  // TO DO move the handle function to the parent component
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNr]);
  };
  console.log(selectedSeats);
  return (
    <button
      seatNr={seatNr}
      disabled={occupied}
      className={occupied ? 'hall__seat occupied' : 'hall__seat'}
      onClick={handleSeatSelected}
    >
      {columnNr}
    </button>
  );
};

export default Seat;
