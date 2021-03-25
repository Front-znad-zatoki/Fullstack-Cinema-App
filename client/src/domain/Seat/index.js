import React, { useState } from 'react';
import './style.scss';

const Seat = () => {
  const [selected, setSelected] = useState(false);

  const seatNr = 1;
  // TO DO move the handle function to the parent component
  const handleSeatSelected = (e) => {
    e.target.classList.toggle('selected');
    setSelected((prevSelected) => !prevSelected);
    console.log(selected);
  };
  return (
    <div>
      <button className="hall__seat" onClick={handleSeatSelected}>
        {seatNr}
      </button>
    </div>
  );
};

export default Seat;
