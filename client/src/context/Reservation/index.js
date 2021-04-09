import { createContext, useReducer } from 'react';
import cinemaHallMock from '../../mock/cinemaHallMock';

export const ReservationContext = createContext();
const initialState = {
  screeningId: '',
  cinemaHallId: '',
  movieId: '',
  totalTickets: 0,
  selectedSeats: [],
  seatsTaken: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS_CINEMAHALL':
      return {
        ...state,
        cinemaHall: action.payload,
      };
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
  const [reservation, dispatchReservation] = useReducer(reducer, initialState);
  return (
    <ReservationContext.Provider value={{ reservation, dispatchReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
