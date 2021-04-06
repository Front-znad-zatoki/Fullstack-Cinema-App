import './style.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import poster from '../../assets/moviePosters/noTimeToDiePoster.jpg';
import { MoviesContext } from '../../context/Movies';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';

function MovieView({ match }) {
  const { currentlyPlaying } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  console.log(currentlyPlaying);
  const movie = currentlyPlaying.filter(
    (item) => item.title === match.params.title,
  );
  const { title, duration, genre, description } = movie[0];
  return (
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
        <button>
          <Link to="/movies">Back</Link>
        </button>
      </div>
    </div>
  );
}

export default MovieView;
