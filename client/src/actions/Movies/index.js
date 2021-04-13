/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';

// Get all movies
export const getMovies = async (dispatch, setLoading) => {
  try {
    const res = await api.get(`movies`);
    dispatch(res.data);
    setLoading(false);
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

// Get single movie screenings
export const getMovieScreeningsByMovieId = async (id, dispatch, setLoading) => {
  try {
    const res = await api.get(`screenings`);
    const filteredScreenings = await res.data.filter((screening) => {
      return screening.movieId === id;
    });
    dispatch(filteredScreenings);
    setLoading(false);
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

// Get single movie
export const getMovieBySlug = async (slug, setLoading) => {
  try {
    const res = await api.get(`movies`);
    const movieFound = await res.data.find((movie) => {
      return movie.slug === slug;
    });
    setLoading(false);
    return movieFound;
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

// Get current cinema screenings
export const getScreeningsForCurrentCinema = async (
  id,
  dispatch,
  setLoading,
) => {
  try {
    const res = await api.get(`screenings`);
    const filteredScreenings = await res.data.filter((screening) => {
      return screening.cinemaHallId.cinemaId._id.toString() === id;
    });
    dispatch(filteredScreenings);
    setLoading(false);
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

// Get movie details
export const getMovieDetails = (id, moviesInContext, setLoading) => {
  try {
    const res = moviesInContext.find((movie) => {
      return movie._id.toString() === id.toString();
    });
    setLoading(false);
    return res;
  } catch (error) {
    console.log('Invalid data');
    return false;
  }
};
