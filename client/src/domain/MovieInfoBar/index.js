import { useHistory, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';
import { getMovieDetails } from '../../actions/Movies';
import './style.scss';

const MovieInfoBar = ({ screening }) => {
  const { dispatchReservation } = useContext(ReservationContext);
  const [currentMovie, setCurrentMovie] = useState();
  const { movies } = useContext(MoviesContext);
  const history = useHistory();
  const screeningHour = new Date(screening.startDate).getHours();
  const screeningMinutes = new Date(screening.startDate).getMinutes();
  useEffect(() => {
    const movieDetails = getMovieDetails(screening.movieId, movies);
    setCurrentMovie((prevCurrentMovie) => movieDetails);
  }, []);
  useEffect(() => {}, [currentMovie]);
  const handleClick = (event) => {
    event.preventDefault();
    dispatchReservation({ type: 'ADD_SCREENING', payload: screening });
    dispatchReservation({ type: 'ADD_MOVIE_DETAILS', payload: currentMovie });
    history.push(`/prebooking/${screening._id}`);
  };
  const releaseDate = currentMovie ? currentMovie.releaseDate.slice(0, 10) : '';
  return currentMovie ? (
    <div className="movie__details">
      <Link
        to={`/movies/${currentMovie.slug}`}
        className="movie__image-container"
      >
        <img
          className="movie__image"
          src={currentMovie.poster}
          alt="Movie poster"
        />
      </Link>
      <div className="movie__info">
        <ul>
          <h2 className="movie__info-title">Title: {currentMovie.title}</h2>
          <li className="movie__info-details">
            Duration: {currentMovie.duration}
          </li>
          <li className="movie__info-details">Release date: {releaseDate}</li>
          <li className="movie__info-details">Genre: {currentMovie.genre}</li>
        </ul>
        <button className="movie__button" onClick={handleClick}>
          {screeningHour < 10 ? `0${screeningHour}` : screeningHour}:
          {screeningMinutes < 10 ? `0${screeningMinutes}` : screeningMinutes}
        </button>
      </div>
    </div>
  ) : null;
};

export default MovieInfoBar;
