import { createContext, useReducer, useState } from 'react';
import { getLocalStorage } from './localStorage';

export const ReservationContext = createContext();
const initialState = {
  screeningId: '',
  cinemaHallId: '',
  movieId: '',
  totalTickets: 0,
  selectedSeats: [],
};
const localReservation = getLocalStorage('reservation', initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SCREENING_ID':
      return {
        ...state,
        screeningId: action.payload,
      };
    case 'ADD_CINEMAHALL_ID':
      return {
        ...state,
        cinemaHallId: action.payload,
      };
    case 'ADD_MOVIE_ID':
      return {
        ...state,
        movieId: action.payload,
      };
    case 'ADD_SEAT':
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    case 'REMOVE_SEAT':
      return {
        ...state,
        selectedSeats: [
          ...state.selectedSeats.filter((seat) => seat !== action.payload),
        ],
      };
    case 'RESET_SEATS':
      return {
        ...state,
        selectedSeats: action.payload,
      };
    case 'ADD_TICKET':
      return {
        ...state,
        totalTickets: state.totalTickets + action.payload,
      };
    case 'REMOVE_TICKET':
      return {
        ...state,
        totalTickets: state.totalTickets - action.payload,
      };
    default:
      return state;
  }
};
const ReservationProvider = ({ children }) => {
  const [reservation, dispatch] = useReducer(reducer, localReservation);
  return (
    <ReservationContext.Provider value={[reservation, dispatch]}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
/* const ReservationProvider = ({ children }) => {
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
export default ReservationProvider; */
