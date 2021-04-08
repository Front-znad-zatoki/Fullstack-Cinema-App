import { SUCCESS } from '../../actions/types';

const moviesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUCCESS:
      return { movies: payload.movies };
    default:
      return state;
  }
};

export default moviesReducer;
