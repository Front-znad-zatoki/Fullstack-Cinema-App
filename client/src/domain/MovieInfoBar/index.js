import { Link, Redirect, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import screenigns from '../../mock/screeningsMock';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';
import { getMovieDetails } from '../../actions/Movies';

const MovieInfoBar = ({ screening }) => {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const [currentMovie, setCurrentMovie] = useState();
  const { movies } = useContext(MoviesContext);
  const history = useHistory();
  const screeningHour = new Date(screening.startDate).getHours();
  const screeningMinutes = new Date(screening.startDate).getMinutes();
  console.log(screeningHour, screeningMinutes);
  useEffect(() => {
    const movieDetails = getMovieDetails(screening.movieId, movies);
    setCurrentMovie(movieDetails);
  }, []);
  const handleClick = (event) => {
    event.preventDefault();
    dispatchReservation({ type: 'ADD_SCREENING', payload: screening });
    dispatchReservation({ type: 'ADD_MOVIE_DETAILS', payload: currentMovie });
    history.push(`/prebooking/${screening._id}`);
  };
  return (
    <div className="movie__details">
      <div className="movie__image-container">
        <img
          className="movie__image"
          src={currentMovie.poster}
          alt="Movie poster"
        />
      </div>
      <ul>
        <h2>Title: {currentMovie.title}</h2>
        <li>Duration: {currentMovie.duration}</li>
        <li>Release date: {currentMovie.releaseDate}</li>
        <li>Description: {currentMovie.description}</li>
        <li>Genre: {currentMovie.genre}</li>
      </ul>
      <button onClick={handleClick}>
        {screeningHour < 10 ? `0${screeningHour}` : screeningHour}:
        {screeningMinutes < 10 ? `0${screeningMinutes}` : screeningMinutes}
      </button>
    </div>
  );
};

export default MovieInfoBar;
