import express from 'express';
import Movie from './Movie.js';
const router = express.Router();
// TODO: error handling
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
    res.status(200).json(movie);
  })
  .put(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    movie.title = req.body.title;
    // TODO: check if title != undefined, if so, keep the old title
    movie.duration = req.body.duration;
    await movie.save();
    res.status(200).json(movie);
  })
  .delete(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    res.status(200).json(movie);
  });

export default router;
