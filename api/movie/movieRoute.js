import express from 'express';
import Movie from './Movie.js';

const router = express.Router();
router
  .route('/')
  .get(async (req, res) => {
    // TODO: add error handling
    const movies = await Movie.find({});
    res.status(200).json(movies);
  })
  // TODO:  add admin check (middleware) for all requests that are not GET
  .post(async (req, res) => {
    const {
      title,
      duration,
      releaseDate,
      description,
      poster,
      genre,
    } = req.body;
    const movie = new Movie({
      title,
      duration,
      releaseDate,
      description,
      poster,
      genre,
    });
    await movie.save();
    res.status(200).json({ message: movie.id, movie: movie });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie === undefined) {
      res.status(404).json({
        error: `Cannot find movie with id: ${req.params.id}`,
      });
    }
    res.status(200).json(movie);
  })
  .put(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    // TODO: findByIdAndUpdate can save you some lines
    if (movie === undefined) {
      res.status(404).json({
        error: `Cannot find movie with id: ${req.params.id}'`,
      });
      return;
    }
    // TODO:  use express-validator checks for that
    if (req.body.title !== undefined) {
      movie.title = req.body.title;
    }
    if (req.body.duration !== undefined) {
      movie.duration = req.body.duration;
    }
    if (req.body.releaseDate !== undefined) {
      movie.releaseDaten = req.body.releaseDate;
    }
    if (req.body.description !== undefined) {
      movie.description = req.body.description;
    }
    if (req.body.poster !== undefined) {
      movie.poster = req.body.poster;
    }
    if (req.body.genre !== undefined) {
      movie.genre = req.body.genre;
    }
    await movie.save();
    res
      .status(200)
      .json({ message: 'Movie updated successfully', movie });
  })
  .delete(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (movie === undefined) {
      res.status(404).json({
        error: `Cannot find movie with id: ${req.params.id}'`,
      });
      return;
    }
    res.status(204).json(movie);
  });

export default router;
