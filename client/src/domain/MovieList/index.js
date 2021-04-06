import { useState, useContext, useEffect } from 'react';
import './style.scss';
import Movie from './Movie';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { MoviesContext } from '../../context/Movies';
import useFetchedData from '../../hooks/useFetchedData';

function MovieList() {
  const { movies, dispatchMovieContext } = useContext(MoviesContext);
  // const { incoming, currentlyPlaying } = movies;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const mongoMovies = useFetchedData('api/movies');

  useEffect(() => {
    dispatchMovieContext({
      type: 'SUCCESS',
      payload: 'action dispatched from useEffect',
    });
  }, [mongoMovies]);

  return (
    <div
      className="movie__list-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4>Rendering movies list</h4>
      {movies ? (
        <ul className="movie__list">
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </ul>
      ) : (
        <div className="movie__error">No movies found</div>
      )}
    </div>
  );
}

export default MovieList;
