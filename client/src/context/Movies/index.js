import React, { createContext, useState, useReducer, useEffect } from 'react';
import moviesMock from '../../mock/moviesMock';
import moviesReducer from './moviesReducer';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const localMovies = localStorage.getItem('movies');
  // const initialState = localMovies ? JSON.parse(localMovies) : moviesMock;
  const initialState = moviesMock;
  const [movies, setMovies] = useState(initialState);
  const [screenings, setScreenings] = useState([]);
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);
  return (
    <MoviesContext.Provider
      value={{ movies, setMovies, screenings, setScreenings }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
