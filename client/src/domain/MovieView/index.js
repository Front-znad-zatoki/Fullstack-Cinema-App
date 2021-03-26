import './style.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import poster from '../../assets/moviePosters/noTimeToDiePoster.jpg';
import { MoviesContext } from '../../context/Movies';

function MovieView({ match }) {
  const { currentlyPlaying } = useContext(MoviesContext);
  const movie = currentlyPlaying.filter(
    (item) => item.title === match.params.title,
  );
  const { title, duration } = movie[0];
  return (
    <div className="movie__view">
      <div className="movie__image-container">
        <img className="movie__image" src={poster} alt="Movie poster" />
      </div>
      <div>{title}</div>
      <div>{duration}</div>
      <button id="back">
        <Link to="/movies">Back</Link>
      </button>
    </div>
  );
}

export default MovieView;
