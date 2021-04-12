import './style.scss';
import { Link } from 'react-router-dom';

function Movie({ movie }) {
  const releaseDateFormated = new Date(movie.releaseDate).toLocaleDateString();
  return (
    <li key={movie.id} className="movie__view app-container">
      <Link
        className="movie__view__container movie__list__item movie__image-link"
        to={`/movies/${movie.slug}`}
      >
        <img
          className="movie__view__container__image"
          src={movie.poster}
          alt="Movie poster"
        />
      </Link>
      <div className="movie__view__container movie__view__details movie__list__item">
        <h3>{movie.title}</h3>
        <p>
          <strong>DURATION:</strong> {movie.duration}
        </p>
        <p>
          <strong>GENRE:</strong> {movie.genre}
        </p>
      </div>
    </li>
  );
}

export default Movie;
