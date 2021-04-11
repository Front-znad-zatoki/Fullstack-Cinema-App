import { useState, useContext, useEffect } from 'react';
import screenigns from '../../mock/screeningsMock';
import MovieInfoBar from '../MovieInfoBar';
import { CinemaContext } from '../../context/Cinema';
import CinemaForm from '../../components/Navbar/CinemaForm';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';
import { getScreeningsForCurrentCinema, getMovies } from '../../actions/Movies';
import RepertoireNav from './RepertoireNav';

function Repertoire() {
  const { currentCinema } = useContext(CinemaContext);
  const { dispatchReservation } = useContext(ReservationContext);
  const { screenings, setScreenings } = useContext(MoviesContext);
  const { movies, setMovies } = useContext(MoviesContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDate = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    getScreeningsForCurrentCinema(currentCinema._id, setScreenings);
  }, [currentCinema]);
  const screeningsForSelectedDate = screenings.filter((screening) => {
    return (
      new Date(screening.startDate).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
    );
  });
  /* useEffect(() => {
    getMovies(setMovies);
  }, []); */
  const moviesForSelectedDate = screeningsForSelectedDate.map((screening) => {
    movies.filter((movie) => {
      console.log(movie._id);
      return movie._id === screening.movieId;
    });
  });

  console.log(movies);
  console.log(screeningsForSelectedDate);
  console.log(moviesForSelectedDate);
  return (
    <div>
      <ul>
        <RepertoireNav
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <li>
          MovieInfoBar with poster, data and screening hours as button to
          proceed with reservagtion
        </li>
        <li>MOCK</li>
        <CinemaForm />

        {screeningsForSelectedDate.map((screening) => {
          return <MovieInfoBar screening={screening} key={screening._id} />;
        })}
      </ul>
    </div>
  );
}

export default Repertoire;
