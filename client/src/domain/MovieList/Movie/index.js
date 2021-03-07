import './style.scss';
import { Link } from 'react-router-dom';
import poster from '../../../assets/moviePosters/noTimeToDiePoster.jpg';

function Movie({ movie }) {
  return (
    <li key={movie.id} className="movie__item">
      {/* TODO: link to specific movie by id? slug? */}
      <Link className="movie__image-container" to="/movies/">
        <img className="movie__image" src={poster} alt="Movie poster" />
      </Link>
      <h3 className="movie__title">{movie.title}</h3>
      <p className="movie__duration movie__text">{movie.duration}</p>
      <p>Duration: {movie.duration}</p>
      <p>Release date: {movie.releaseDate}</p>
      <p>Description: {movie.description}</p>
      <p>Genre: {movie.genre}</p>
    </li>
  );
}

export default Movie;
