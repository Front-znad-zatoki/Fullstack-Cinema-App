import { useState } from 'react';
import './style.scss';
import moviesMock from '../../mock/moviesMock';
import Movie from './Movie';

function MovieList() {
  const [movies, setMovies] = useState(moviesMock);
  return (
    <div className="movie__list-container">
      <ul className="movie__list">
        {movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </ul>
    </div>
  );
}

export default MovieList;
