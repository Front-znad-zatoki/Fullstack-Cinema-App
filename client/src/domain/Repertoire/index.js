import { useState, useContext, useEffect } from 'react';
import MovieInfoBar from '../MovieInfoBar';
import { CinemaContext } from '../../context/Cinema';
import CinemaForm from '../../components/Navbar/CinemaForm';
import { MoviesContext } from '../../context/Movies';
import { getScreeningsForCurrentCinema } from '../../actions/Movies';
import RepertoireNav from './RepertoireNav';

function Repertoire() {
  const { currentCinema } = useContext(CinemaContext);
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
