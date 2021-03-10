import express from 'express';
import Movie from './Movie.js';

const router = express.Router();
router
  .route('/')
  .get(async (req, res) => {
    // TODO: add error handling
    try {
      const movies = await Movie.find({});
      res.status(200).json(movies);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // TODO:  add admin check (middleware) for all requests that are not GET
  .post(async (req, res) => {
    const { title, duration } = req.body;
    try {
      const movie = new Movie({ title, duration });
      await movie.save();
      res.status(200).json({ message: movie.id });
    } catch (e) {
      res.status(400).send(e);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    try {
      if (movie === undefined) {
        res.status(404).json({
          error: `Cannot find movie with id: ${req.params.id}`,
        });
      }
      res.status(200).json(movie);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .put(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    // TODO: findByIdAndUpdate can save you some lines
    try {
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
      await movie.save();
      res
        .status(200)
        .json({ message: 'Movie updated successfully', movie });
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .delete(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    try {
      if (movie === undefined) {
        res.status(404).json({
          error: `Cannot find movie with id: ${req.params.id}'`,
        });
        return;
      }
      res.status(204).json(movie);
    } catch (e) {
      res.sendStatus(400).send(e);
    }
  });

export default router;
