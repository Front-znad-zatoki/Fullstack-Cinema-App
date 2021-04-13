import { useState, useContext, useEffect } from 'react';
import MovieInfoBar from '../MovieInfoBar';
import { CinemaContext } from '../../context/Cinema';
import { MoviesContext } from '../../context/Movies';
import { getScreeningsForCurrentCinema } from '../../actions/Movies';
import RepertoireNav from './RepertoireNav';
import CustomLoader from '../../components/Loader';

function Repertoire() {
  const [loading, setLoading] = useState(true);
  const { currentCinema } = useContext(CinemaContext);
  const { screenings, setScreenings } = useContext(MoviesContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    setLoading(true);
    getScreeningsForCurrentCinema(currentCinema._id, setScreenings, setLoading);
  }, [currentCinema]);
  const screeningsForSelectedDate = screenings.filter((screening) => {
    return (
      new Date(screening.startDate).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
    );
  });
  if (loading)
    return (
      <div>
        <CustomLoader />
      </div>
    );
  return (
    <div>
      <RepertoireNav
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      {screeningsForSelectedDate.map((screening) => {
        return <MovieInfoBar screening={screening} key={screening._id} />;
      })}
    </div>
  );
}

export default Repertoire;
