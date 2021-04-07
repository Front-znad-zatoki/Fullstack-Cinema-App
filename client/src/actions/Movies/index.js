/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { FAIL, SUCCESS } from '../types';

// Get all movies
export const getMovies = async (dispatch) => {
  try {
    console.log('getting');
    const res = await api.get(`movies`);
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

// Get single movie
export const getMovieScreeningsByMovieId = async (id, dispatch) => {
  try {
    const res = await api.get(`screenings/`);
    const filteredScreenings = await res.data.filter((screening) => {
      return screening.movieId === id;
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
