/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { ADD_OCCUPIED_SEATS } from '../types';

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
    console.log(id);
    const res = await api.get(`tickets`);
    const filteredTickets = await res.data.filter((ticket) => {
      return ticket.screening === id;
    });
    const occupiedSeats = filteredTickets.map((ticket) => {
      return { seat: ticket.seat };
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
