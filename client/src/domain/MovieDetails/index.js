import './style.scss';
import React from 'react';
import poster from '../../assets/moviePosters/noTimeToDiePoster.jpg';

function MovieDetails({ movie }) {
  return (
    <div className="movie__details">
      <div className="movie__image-container">
        <img className="movie__image" src={poster} alt="Movie poster" />
      </div>
      <ul>
        <h2>Title: {movie.title}</h2>
        <li>Duration: {movie.duration}</li>
        <li>Release date: {movie.releaseDate}</li>
        <li>Description: {movie.description}</li>
        <li>Genre: {movie.genre}</li>
      </ul>
    </div>
  );
}

export default MovieDetails;
