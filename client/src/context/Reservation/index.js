import { createContext, useState } from 'react';

export const ReservationContext = createContext();
const ReservationProvider = ({ children }) => {
  const [selctedSeats, setSelectedSeats] = useState([]);
  return (
    <ReservationContext.Provider value={[selctedSeats, setSelectedSeats]}>
      {children}
    </ReservationContext.Provider>
  );
};
export default ReservationProvider;
