import React, { useState, useContext } from 'react';
import './style.scss';
import { ReservationContext } from '../../context/Reservation';

const Seat = ({ columnNr, seatNr }) => {
  const [selectedSeats, setSelectedSeats, tickets, setTickets] = useContext(
    ReservationContext,
  );
  // TO DO gest variables from props
  const occupied = false;
  // TO DO move the handle function to the parent component
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    if (selectedSeats.includes(seatNr)) {
      const newSelectedSeats = selectedSeats.filter((seat) => {
        return seat !== seatNr;
      });
      setSelectedSeats((prevselectedSeats) => [newSelectedSeats]);
      setTickets((prevTickets) => prevTickets - 1);
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNr]);
      setTickets((prevTickets) => prevTickets + 1);
    }
  };
  console.log(selectedSeats, tickets);
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
