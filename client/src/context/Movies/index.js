import React, { createContext, useState, useReducer, useEffect } from 'react';
import moviesMock from '../../mock/moviesMock';
import moviesReducer from './moviesReducer';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(moviesReducer, {}, () => {
    const localMovies = localStorage.getItem('movies');
    return localMovies ? JSON.parse(localMovies) : moviesMock;
  });
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);
  return (
    <MoviesContext.Provider value={{ movies, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
