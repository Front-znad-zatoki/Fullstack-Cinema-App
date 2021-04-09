import './style.scss';
import { Link } from 'react-router-dom';

function Movie({ movie }) {
  const releaseDateFormated = new Date(movie.releaseDate).toLocaleDateString();
  return (
    <li key={movie.id} className="movie__item">
      <Link className="movie__image-container" to={`/movies/${movie.slug}`}>
        <img className="movie__image" src={movie.poster} alt="Movie poster" />
      </Link>
      <h3 className="movie__title">{movie.title}</h3>
      <p>Duration: {movie.duration}</p>
      <p>Release date: {releaseDateFormated}</p>
      <p>Description: {movie.description}</p>
      <p>Genre: {movie.genre}</p>
    </li>
  );
}

export default Movie;
