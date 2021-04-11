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
  useEffect(() => {
    const movieDetails = getMovieDetails(screening.movieId, movies);
    setCurrentMovie(movieDetails);
  }, []);
  const handleClick = (event) => {
    event.preventDefault();
    dispatchReservation({ type: 'ADD_SCREENING', payload: screening });
    dispatchReservation({ type: 'ADD_MOVIE_DETAILS', payload: currentMovie });
    console.log(currentMovie);
    history.push(`/prebooking/${screening._id}`);
  };
  return (
    <li key={screening.id}>
      <p>{screening.movieId}</p>
      <button onClick={handleClick}>{screening.startDate}</button>
    </li>
  );
};

export default MovieInfoBar;
