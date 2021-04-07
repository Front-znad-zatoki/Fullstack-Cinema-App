/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import './style.scss';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import poster from '../../assets/moviePosters/noTimeToDiePoster.jpg';
import { MoviesContext } from '../../context/Movies';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { getMovieScreeningsByMovieId } from '../../actions/Movies';

function MovieView({ match }) {
  const { movies } = useContext(MoviesContext);
  const { screenings, setScreenings } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const movie = movies.find((item) => item.slug === match.params.movieSlug);
  const { title, duration, genre, description } = movie;
  console.log(movie);
  console.log(screenings);
  useEffect(() => {
    getMovieScreeningsByMovieId(movie._id, setScreenings);
  }, []);
  return (
    <div
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <p>Rendering Single Movie View</p>
      <div className="movie__view__container">
        <img
          className="movie__view__container__image"
          src={poster}
          alt="Movie poster"
        />
      </div>
      <div className="movie__view__details">
        <h3>{title}</h3>
        <p>
          <strong>duration:</strong> {duration}
        </p>
        <p>
          <strong>genre:</strong> {genre}
        </p>
        <p>
          <strong>description:</strong> {description}
        </p>
        <h4>We're playing now in:</h4>
        <ul>
          {/* TODO: create pipe to format date */}
          {screenings
            ? screenings.map((screening, index) => {
                return (
                  <li key={index}>
                    <p>{screening.startDate}</p>
                  </li>
                );
              })
            : null}
        </ul>
        <button>
          <Link to="/movies">Back</Link>
        </button>
      </div>
    </div>
  );
}

export default MovieView;
