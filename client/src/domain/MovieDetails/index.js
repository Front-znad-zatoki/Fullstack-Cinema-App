import './style.scss';
import React from 'react';
import poster from '../../assets/moviePosters/noTimeToDiePoster.jpg';

function MovieDetails({
  movie = {
    title: 'No Time to Die',
    duration: 163,
    releaseDate: '30 September 2021 (UK)',
    description:
      'James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.',
    genre: 'Action, Adventure, Thriller',
  },
}) {
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
