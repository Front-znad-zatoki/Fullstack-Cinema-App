/* eslint-disable no-underscore-dangle */
import { useState, useContext, useEffect } from 'react';
import './style.scss';
import Movie from './Movie';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { MoviesContext } from '../../context/Movies';
import useFetchedData from '../../hooks/useFetchedData';
import { getMovies } from '../../actions/Movies';

function MovieList() {
  const { movies, setMovies } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

  useEffect(() => {
    getMovies(setMovies);
  }, []);
  return (
    <div
      className="movie__list-container app-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4>Movies</h4>
      {movies ? (
        <ul className="movie__list">
          {movies.map((movie) => {
            return <Movie key={movie._id} movie={movie} />;
          })}
        </ul>
      ) : (
        <div className="movie__error">No movies found</div>
      )}
    </div>
  );
}

export default MovieList;
