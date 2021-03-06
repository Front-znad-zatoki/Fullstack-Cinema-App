import { useState, useContext } from 'react';
import './style.scss';
import moviesMock from '../../mock/moviesMock';
import Movie from './Movie';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';

function MovieList() {
  const [movies, setMovies] = useState(moviesMock);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  return (
    <div
      className="movie__list-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <ul className="movie__list">
        {movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </ul>
    </div>
  );
}

export default MovieList;
