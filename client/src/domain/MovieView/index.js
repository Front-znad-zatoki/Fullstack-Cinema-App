/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import './style.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../context/Movies';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import {
  getMovieScreeningsByMovieId,
  getMovieBySlug,
  getMovies,
} from '../../actions/Movies';

function MovieView({ match }) {
  const { movies, setMovies } = useContext(MoviesContext);
  const { screenings, setScreenings } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const movie = movies.find((item) => item.slug === match.params.movieSlug);
  const [currentMovie, setCurrentMovie] = useState(movie);
  // TODO: add case of entering this url before previously enterign list
  useEffect(() => {
    if (!movie) {
      getMovies(setMovies);
      getMovieBySlug(match.params.movieSlug, setCurrentMovie);
      return;
    }
    setCurrentMovie(movie);
  }, []);
  useEffect(() => {
    getMovieScreeningsByMovieId(currentMovie._id, setScreenings);
  }, [currentMovie]);


  return movie ? (
    <div
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <div className="movie__view__container">
        <img
          className="movie__view__container__image"
          src={movie.poster}
          alt="Movie poster"
        />
      </div>
      <div className="movie__view__details">
        <h3>{movie.title}</h3>
        <p>
          <strong>duration:</strong> {movie.duration}
        </p>
        <p>
          <strong>genre:</strong> {movie.genre}
        </p>
        <p>
          <strong>description:</strong> {movie.description}
        </p>
        <h4>We're playing now in:</h4>
        <ul>
          {screenings
            ? screenings.map((screening, index) => {
                const startDate = new Date(screening.startDate);
                const startDateFormatted = new Date(
                  startDate,
                ).toLocaleDateString();
                if (startDate.getTime() < new Date().getTime()) {
                  return null;
                }
                return (
                  <li key={index}>
                    <p>
                      In {screening.cinemaHallId.cinemaId.city} at{' '}
                      {startDateFormatted}
                    </p>
                  </li>
                );
              })
            : null}
        </ul>
        <Link to="/">Full Repertoire</Link>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default MovieView;
