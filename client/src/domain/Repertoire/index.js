import { useState, useContext, useEffect } from 'react';
import screenigns from '../../mock/screeningsMock';
import MovieInfoBar from '../MovieInfoBar';
import { CinemaContext } from '../../context/Cinema';
import CinemaForm from '../../components/Navbar/CinemaForm';
import { ReservationContext } from '../../context/Reservation';
import { MoviesContext } from '../../context/Movies';
import { getScreeningsForCurrentCinema } from '../../actions/Movies';

function Repertoire() {
  const { currentCinema } = useContext(CinemaContext);
  const { dispatchReservation } = useContext(ReservationContext);
  const { screenings, setScreenings } = useContext(MoviesContext);
  useEffect(() => {
    getScreeningsForCurrentCinema(currentCinema._id, setScreenings);
  }, [currentCinema]);
  return (
    <div>
      <ul>
        <li>Repertoire navbar: cinema, date picker, search</li>
        <li>
          MovieInfoBar with poster, data and screening hours as button to
          proceed with reservagtion
        </li>
        <li>MOCK</li>
        <CinemaForm />

        {screenings
          ? screenings.map((screening) => {
              return <MovieInfoBar screening={screening} key={screening._id} />;
            })
          : null}
      </ul>
    </div>
  );
}

export default Repertoire;
