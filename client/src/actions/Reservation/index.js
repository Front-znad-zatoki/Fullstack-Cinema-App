/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { ADD_OCCUPIED_SEATS, ADD_ORDER_DETAILS } from '../types';

// Get all cinema halls
export const getCinemaHalls = async (dispatch) => {
  try {
    const res = await api.get(`cinemahalls`);
    dispatch(res.data);
    return res;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return false;
  }
};

// Get single cinema hall screenings
export const getHallScreeningsByHallId = async (id, dispatch) => {
  try {
    const res = await api.get(`screenings`);
    const filteredTickets = await res.data.filter((screening) => {
      return screening.cinemaHallId === id;
    });
    dispatch(filteredTickets);
    return filteredTickets;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return false;
  }
};

// Get single cinema hall screenings
export const getOccupiedSeatsForScreening = async (id, dispatch) => {
  try {
    const res = await api.get(`tickets`);
    const filteredTickets = await res.data.filter((ticket) => {
      return ticket.screening === id;
    });
    const occupiedSeats = filteredTickets.map((ticket) => {
      const { seat } = ticket;
      seat.seatNr = `${String.fromCharCode(seat.row + 65)}${seat.column + 1}`;
      return seat;
    });
    dispatch({
      type: ADD_OCCUPIED_SEATS,
      payload: occupiedSeats,
    });
    return occupiedSeats;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return false;
  }
};

// Place Order
export const placeOrder = async (formData, dispatch) => {
  try {
    const orderDTO = {
      ...formData,
      ticketsData: formData.ticketsData.map((ticket) => {
        return {
          seatNr: [ticket.row - 1, ticket.column - 1],
          price: ticket.price,
        };
      }),
    };
    const res = await api.post(`orders`, orderDTO);
    dispatch({
      type: ADD_ORDER_DETAILS,
      payload: res.data.order,
    });
    return res;
  } catch (error) {
    if (error.response) {
      const { errors } = error.response.data;
      if (typeof errors !== 'string') {
        errors.forEach((err) => alert(err.msg, 'Something went wrong'));
      } else {
        alert(error.response.data);
      }
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
      alert(error.request);
    } else {
      console.log('Error', error.message);
      alert(error.message);
    }
    return false;
  }
};
