import React, { createContext, useState, useReducer, useEffect } from 'react';
import moviesMock from '../../mock/moviesMock';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(moviesMock);
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
