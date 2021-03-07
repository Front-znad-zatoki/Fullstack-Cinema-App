import React, { createContext, useState, useReducer, useEffect } from 'react';
import moviesMock from '../../mock/moviesMock';
import moviesReducer from '../../reducers/Movies/moviesReducer';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  // const [movies, setMovies] = useState(moviesMock);
  const [movies, dispatch] = useReducer(moviesReducer, {}, () => {
    const localMovies = localStorage.getItem('movies');
    // console.log('from local storage: ', localMovies);
    return localMovies ? JSON.parse(localMovies) : moviesMock;
  });
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);
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
