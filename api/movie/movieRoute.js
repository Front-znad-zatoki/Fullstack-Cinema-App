import express from 'express';
import Movie from './Movie.js';
const router = express.Router();
router
  .route('/')
  .get(async (req, res) => {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  })
  .post(async (req, res) => {
    const { title, duration } = req.body;
    const movie = new Movie({ title, duration });
    await movie.save();
    res.status(200).json({ message: movie.id });
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
    if (movie === undefined) {
      res.status(404).json({
        error: `Cannot find movie with id: ${req.params.id}'`,
      });
      return;
    }
    if (req.body.title !== undefined) {
      movie.title = req.body.title;
    }
    if (req.body.duration !== undefined) {
      movie.duration = req.body.duration;
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
