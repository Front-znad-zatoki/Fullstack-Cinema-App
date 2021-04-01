import { createContext, useState } from 'react';

export const ReservationContext = createContext();
const ReservationProvider = ({ children }) => {
  const [selctedSeats, setSelectedSeats] = useState([]);
  const [tickets, setTickets] = useState(0);
  return (
    <ReservationContext.Provider
      value={[selctedSeats, setSelectedSeats, tickets, setTickets]}
    >
      {children}
    </ReservationContext.Provider>
  );
};
export default ReservationProvider;
