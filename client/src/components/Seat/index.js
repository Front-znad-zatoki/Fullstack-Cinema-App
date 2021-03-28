import React, { useState } from 'react';
import './style.scss';

const Seat = () => {
  const [selected, setSelected] = useState(false);
  // TO DO gest variables from props
  const occupied = false;
  const seatNr = 1;
  // TO DO move the handle function to the parent component
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    setSelected((prevSelected) => !prevSelected);
  };
  return (
    <button
      disabled={occupied}
      className={occupied ? 'hall__seat occupied' : 'hall__seat'}
      onClick={handleSeatSelected}
    >
      {seatNr}
    </button>
  );
};

export default Seat;
