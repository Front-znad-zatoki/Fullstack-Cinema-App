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
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    getScreeningsForCurrentCinema(currentCinema._id, setScreenings);
  }, [currentCinema]);
  const screeningsForSelectedDate = screenings.filter((screening) => {
    return (
      new Date(screening.startDate).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
    );
  });
  return (
    <div>
      <RepertoireNav
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <CinemaForm />

      {screeningsForSelectedDate.map((screening) => {
        return <MovieInfoBar screening={screening} key={screening._id} />;
      })}
    </div>
  );
}

export default Repertoire;
