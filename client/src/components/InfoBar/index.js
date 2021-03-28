import React from 'react';

const InfoBar = () => {
  // TO DO get variables from props
  const title = 'No time to die';
  const date = 'Tue, 07 Feb 2022 12:30';
  const cinemaCity = 'Warsaw';
  return (
    <div className="bar">
      <p>{title}</p>
      <p>{date}</p>
      <p>Cinema: {cinemaCity}</p>
    </div>
  );
};

export default InfoBar;
