/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';

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
    const filteredScreenings = await res.data.filter((screening) => {
      return screening.cinemaHallId === id;
    });
    dispatch(filteredScreenings);
    return filteredScreenings;
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
