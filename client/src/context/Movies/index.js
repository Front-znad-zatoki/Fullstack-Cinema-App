import React, { createContext, useState } from 'react';
import moviesMock from '../../mock/moviesMock';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(moviesMock);
  const fetchAndSetMovies = () => {
    console.log('fetching and setting movies');
    setMovies(moviesMock);
  };
  return (
    <MoviesContext.Provider value={{ movies, fetchAndSetMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
