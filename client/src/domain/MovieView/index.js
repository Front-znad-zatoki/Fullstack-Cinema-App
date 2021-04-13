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
import CustomLoader from '../../components/Loader';

function MovieView({ match }) {
  const [loading, setLoading] = useState(true);
  const { movies, setMovies } = useContext(MoviesContext);
  const [screenings, setScreenings] = useState([]);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const movie = movies.find((item) => item.slug === match.params.movieSlug);
  const [currentMovie, setCurrentMovie] = useState(movie);

  useEffect(() => {
    setLoading(true);
    if (!movie) {
      getMovies(setMovies, setLoading);
      getMovieBySlug(match.params.movieSlug, setCurrentMovie, setLoading);
      return;
    }
    setCurrentMovie(movie);
  }, []);
  useEffect(() => {
    setLoading(true);
    if (currentMovie) {
      getMovieScreeningsByMovieId(currentMovie._id, setScreenings, setLoading);
      getMovieBySlug(match.params.movieSlug, setCurrentMovie, setLoading);
    }
  }, [currentMovie, movies]);
  if (loading)
    return (
      <div>
        <CustomLoader />
      </div>
    );
  return movie ? (
    <div
      className="movie__view app-container"
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
      <div className="movie__view__details movie__view__container">
        <h3>{movie.title}</h3>
        <p>
          <strong>DURATION:</strong> {movie.duration}
        </p>
        <p>
          <strong>GENRE:</strong> {movie.genre}
        </p>
        <p>
          <strong>DESCRIPTION:</strong> {movie.description}
        </p>
        {screenings.length > 0 ? <h4>PLAYING IN:</h4> : null}
        <ul>
          {screenings
            ? screenings.map((screening, index, array) => {
                if (index < 5) {
                  const startDate = new Date(screening.startDate);
                  const startDateFormatted = new Date(
                    startDate,
                  ).toLocaleDateString();
                  if (startDate.getTime() < new Date().getTime()) {
                    return null;
                  }
                  return (
                    <li className="movie__view__screenings" key={index}>
                      <p>
                        {screening.cinemaHallId.cinemaId.city}{' '}
                        {startDateFormatted}
                      </p>
                    </li>
                  );
                }
                if (index === 5) {
                  return (
                    <li className="movie__view__screenings">AND MOre...</li>
                  );
                }
              })
            : null}
          <Link className="link--button-style" to="/">
            Full Repertoire
          </Link>
        </ul>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default MovieView;
