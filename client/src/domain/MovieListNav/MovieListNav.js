import React, { useState } from 'react';
import { SingleDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

function MovieListNav() {
  const [date, setDate] = useState(new Date());
  const [movies, setMovies] = useState('');
  const movieList = ["Adam's Apples", 'Avatar', 'No time to die'];
  function handleFilterList(e) {
    const text = e.target.value;
    const newMoviesList = movieList.filter(
      (movie) => movie.toLowerCase().includes(text.toLowerCase()),
      console.log(newMoviesList),
    );
    setMovies({ movies: newMoviesList });
  }

  return (
    <div className="list_nav">
      <p>REPERTOIRE</p>
      <SingleDatePicker
        startDate={date}
        onChange={() => setDate(date)}
        minDate={date}
        maxDate={new Date(2100, 0, 1)}
        dateFormat="D"
        monthFormat="MMM YYYY"
        disabled="true"
        className="my-own-class-name"
        startWeekDay="monday"
      />
      <input
        type="text"
        placeholder="search by title..."
        onChange={handleFilterList}
      />
    </div>
  );
}
export default MovieListNav;
