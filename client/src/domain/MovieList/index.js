import { useState, useContext, useEffect } from 'react';
import './style.scss';
import moviesMock from '../../mock/moviesMock';
import Movie from './Movie';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { MoviesContext } from '../../context/Movies';

function MovieList() {
  // const [movies, setMovies] = useState(null);
  const { incoming, currentlyPlaying } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  useEffect(() => {
    console.log('using effect', incoming, currentlyPlaying);
    // setMovies(moviesMock);
  }, []);

  return (
    <div
      className="movie__list-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4>Rendering movies list</h4>
      {currentlyPlaying && (
        <ul className="movie__list">
          {currentlyPlaying.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
