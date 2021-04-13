/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import Movie from './Movie';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { MoviesContext } from '../../context/Movies';
import { getMovies } from '../../actions/Movies';
import CustomLoader from '../../components/Loader';

function MovieList() {
  const [loading, setLoading] = useState(false);
  const { movies, setMovies } = useContext(MoviesContext);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

  useEffect(() => {
    setLoading(true);
    getMovies(setMovies, setLoading);
  }, []);

  if (loading) return <CustomLoader />;
  return (
    <div
      className="movie__list-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h4 className="movie__header">MOVIES</h4>
      {movies ? (
        <ul className="movie__view__list">
          {movies.map((movie) => {
            return <Movie key={movie._id} movie={movie} />;
          })}
        </ul>
      ) : (
        <div className="movie__error">No movies found</div>
      )}
    </div>
  );
}

export default MovieList;
