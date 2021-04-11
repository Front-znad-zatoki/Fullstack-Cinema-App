import { createContext, useReducer } from 'react';
import {
  ADD_MOVIE_DETAILS,
  ADD_SCREENING,
  ADD_SEAT,
  ADD_TICKET,
  REMOVE_SEAT,
  REMOVE_TICKET,
  RESET_SEATS,
  RESET_RESERVATION,
  UPDATE_TICKET_PRICE,
  ADD_OCCUPIED_SEATS,
  ADD_ORDER_DETAILS,
} from '../../actions/types';

export const ReservationContext = createContext();
const initialState = {
  screening: null,
  totalTickets: 0,
  selectedSeats: [],
  movieDetails: {},
  occupiedSeats: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    case ADD_SCREENING:
      return {
        ...state,
        screening: action.payload,
      };
    case ADD_OCCUPIED_SEATS:
      return {
        ...state,
        occupiedSeats: action.payload,
      };
    case ADD_SEAT:
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    case REMOVE_SEAT:
      return {
        ...state,
        selectedSeats: [
          ...state.selectedSeats.filter(
            (seat) => seat.seatNr !== action.payload,
          ),
        ],
      };
    case RESET_SEATS:
      return {
        ...state,
        selectedSeats: action.payload,
      };
    case UPDATE_TICKET_PRICE:
      return {
        ...state,
        selectedSeats: [
          ...state.selectedSeats.map((seat, index) => {
            if (seat.seatNr === action.payload.seatNr) {
              return {
                ...state.selectedSeats[index],
                price: action.payload.price,
              };
            }
            return seat;
          }),
        ],
      };
    case ADD_TICKET:
      return {
        ...state,
        totalTickets: state.totalTickets + action.payload,
      };
    case REMOVE_TICKET:
      return {
        ...state,
        totalTickets: state.totalTickets - action.payload,
      };
    case RESET_RESERVATION:
      return {
        ...initialState,
      };
    case ADD_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
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
