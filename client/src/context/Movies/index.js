import React, { createContext, useState, useReducer } from 'react';
import moviesMock from '../../mock/moviesMock';
import moviesReducer from '../../reducers/Movies/moviesReducer';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  // const [movies, setMovies] = useState(moviesMock);
  const [movies, dispatch] = useReducer(moviesReducer, moviesMock);
  // const fetchAndSetMovies = () => {
  //   console.log('fetching and setting movies');
  //   // setMovies(moviesMock);
  // };
  return (
    <MoviesContext.Provider value={{ movies, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
