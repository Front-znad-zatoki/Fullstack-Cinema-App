import { useState, useContext } from 'react';
import screenigns from '../../mock/screeningsMock';
import MovieInfoBar from '../MovieInfoBar';
import { CinemaContext } from '../../context/Cinema';
import CinemaForm from '../../components/Navbar/CinemaForm';

function Repertoire() {
  const { currentCinema } = useContext(CinemaContext);
  // TODO: add reservation and movies context

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

        {screenigns.map((screening) => {
          return <MovieInfoBar screening={screening} key={screening.id} />;
        })}
      </ul>
    </div>
  );
}

export default Repertoire;
