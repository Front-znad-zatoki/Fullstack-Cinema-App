import React, { useState } from 'react';
import './style.scss';

const Seat = ({ id, seatNr }) => {
  const [selected, setSelected] = useState(false);
  // TO DO gest variables from props
  const occupied = false;
  // TO DO move the handle function to the parent component
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    setSelected((prevSelected) => !prevSelected);
  };
  return (
    <button
      id={id}
      disabled={occupied}
      className={occupied ? 'hall__seat occupied' : 'hall__seat'}
      onClick={handleSeatSelected}
    >
      {seatNr}
    </button>
  );
};

export default Seat;
