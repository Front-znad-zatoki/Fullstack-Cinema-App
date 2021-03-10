/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import './style.scss';
// import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function MovieListNav() {
  const [startDate, setStartDate] = useState(new Date());
  const [movies, setMovies] = useState('');
  const handleDate = (date) => {
    setStartDate(date);
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
    <div className="movie_nav">
      <h3 style={{ color: 'white' }}>REPERTOIRE</h3>
      <DatePicker
        className="movie_nav_date"
        selected={startDate}
        onChange={handleDate}
        dateFormat="EEEE, dd.MM"
        minDate={startDate}
        maxDate={moment().add(5, 'days').toDate()}
      />
      <input
        className="movie_nav_search"
        type="text"
        placeholder="search by title..."
        // onChange={handleSearchMovies.bind(this)}
      />
    </div>
  );
}
export default MovieListNav;
