import React, { createContext, useState } from 'react';
import moviesMock from '../../mock/moviesMock';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(moviesMock);
  return (
    <MoviesContext.Provider value={movies}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
