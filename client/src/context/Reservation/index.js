import { createContext, useReducer } from 'react';
import cinemaHallMock from '../../mock/cinemaHallMock';

export const ReservationContext = createContext();
const initialState = {
  screening: {},
  totalTickets: 0,
  selectedSeats: [],
  movieDetails: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_DETAILS':
      return {
        ...state,
        movieDetails: action.payload,
      };
    case 'ADD_SCREENING':
      return {
        ...state,
        screening: action.payload,
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
  const [reservation, dispatchReservation] = useReducer(reducer, initialState);
  console.log(reservation);
  return (
    <ReservationContext.Provider value={{ reservation, dispatchReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
