/* eslint-disable jsx-a11y/no-onchange */
import { useEffect, useContext } from 'react';
import { CinemaContext } from '../../../context/Cinema';
import './style.scss';
import getCinemas from '../../../actions/Cinema';

function CinemaForm() {
  const { cinemas, setCinemas, currentCinema, setCurrentCinema } = useContext(
    CinemaContext,
  );

  useEffect(() => {
    getCinemas(setCinemas);
  }, []);

  const handleChange = (event) => {
    const nextCurrentCinema = cinemas.find((cinema) => {
      return cinema.city === event.target.value;
    });
    setCurrentCinema(nextCurrentCinema);
    console.log('setting to', nextCurrentCinema);
  };
  return (
    <form className="cinema-city__form">
      <label htmlFor="cinemaCity">
        CHOOSE CINEMA
        <select
          className="cinema-city__form__select"
          id="cinemaCity"
          value={currentCinema.city}
          onChange={handleChange}
        >
          {cinemas.map((cinemaToChooseFrom) => {
            return (
              <option
                // eslint-disable-next-line no-underscore-dangle
                key={cinemaToChooseFrom._id}
                value={cinemaToChooseFrom.city}
              >
                {cinemaToChooseFrom.city}
              </option>
            );
          })}
        </select>
      </label>
    </form>
  );
}

export default CinemaForm;
