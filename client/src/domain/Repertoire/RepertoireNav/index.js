import React, { useState } from 'react';
import './style.scss';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function RepertoireNav({ selectedDate, setSelectedDate }) {
  const [movies, setMovies] = useState('');
  const handleDate = (date) => {
    setSelectedDate(date);
  };

  /* function getFilteredMoviesForText(text) {
    return movieList.filter((movie) =>
      movie.toLowerCase().includes(text.toLowerCase()),
    );
  }
  function handleSearchMovies(e) {
    const text = e.currentTarget.value;
    const filteredMovies = getFilteredMoviesForText(text);
    console.log(filteredMovies);
    setMovies({
      movies: filteredMovies,
    });
  } */
  return (
    <div className="repertoire__nav">
      <h3>REPERTOIRE</h3>
      <div>
        <DatePicker
          value={selectedDate}
          onChange={handleDate}
          // minDate={selectedDate}
          // maxDate={moment().add(7, 'days').toDate()}
        />
      </div>
      <input
        className="movie_nav_search"
        type="text"
        placeholder="search by title..."
        // onChange={handleSearchMovies.bind(this)}
      />
    </div>
  );
}
export default RepertoireNav;
