import { useState, useContext, useEffect } from 'react';
import screenigns from '../../mock/screeningsMock';
import MovieInfoBar from '../MovieInfoBar';
import { CinemaContext } from '../../context/Cinema';
import CinemaForm from '../../components/Navbar/CinemaForm';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';
import { getScreeningsForCurrentCinema } from '../../actions/Movies';
import RepertoireNav from './RepertoireNav';

function Repertoire() {
  const { currentCinema } = useContext(CinemaContext);
  const { dispatchReservation } = useContext(ReservationContext);
  const { screenings, setScreenings } = useContext(MoviesContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDate = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    getScreeningsForCurrentCinema(currentCinema._id, setScreenings);
  }, [currentCinema]);
  const screnings = screenings.map((screening) => {
    return screening.startDate;
  });
  console.log(screnings);
  console.log(selectedDate.toISOString());
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

        {screenings.map((screening) => {
          return <MovieInfoBar screening={screening} key={screening._id} />;
        })}
      </ul>
    </div>
  );
}

export default Repertoire;
