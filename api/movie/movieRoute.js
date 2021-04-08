import express from 'express';
import { check, validationResult } from 'express-validator';
import Movie from './Movie.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';
import { slugify } from '../utils/convertTitleToSlug.js';

const router = express.Router();
router
  .route('/')
  // @route GET api/movies
  // @description Get all movies
  // @access public
  .get(async (req, res) => {
    try {
      const movies = await Movie.find({});
      res.status(200).json(movies);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route POST api/movies
  // @description Create a movie
  // @access admin
  .post(
    authMiddleware,
    adminMiddleware,
    check('title', 'Please enter a title')
      .trim()
      .notEmpty()
      .isString(),
    check('duration', 'Please enter a duration').notEmpty().isFloat(),
    check('releaseDate', 'Please enter a release date')
      .trim()
      .isISO8601()
      .toDate(),
    check('description', 'Please enter a description')
      .trim()
      .notEmpty()
      .isString(),
    check('poster', 'Poster is required')
      .trim()
      .notEmpty()
      .isString(),
    check('genre', 'Please enter a genre')
      .trim()
      .notEmpty()
      .isString(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        title,
        duration,
        releaseDate,
        description,
        poster,
        genre,
      } = req.body;
      try {
        const slug = slugify(title);
        const movie = new Movie({
          title,
          duration,
          releaseDate,
          description,
          poster,
          genre,
          slug,
        });
        await movie.save();
        res.status(200).json({ message: 'Movie created', movie });
      } catch (e) {
        res.status(400).send(e);
      }
    },
  );

router
  .route('/:id')
  // @route GET api/movies/id
  // @description get all movies
  // @access user
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
  // @route PUT api/movies/id
  // @description Update a movie
  // @access admin
  .put(authMiddleware, adminMiddleware, async (req, res) => {
    const {
      title,
      duration,
      releaseDate,
      description,
      poster,
      genre,
    } = req.body;
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
      if (title !== undefined) {
        movie.title = title;
      }
      if (duration !== undefined) {
        movie.duration = duration;
      }
      if (releaseDate !== undefined) {
        movie.duration = releaseDate;
      }
      if (description !== undefined) {
        movie.duration = description;
      }
      if (poster !== undefined) {
        movie.duration = poster;
      }
      if (genre !== undefined) {
        movie.duration = genre;
      }
      await movie.save();
      res
        .status(200)
        .json({ message: 'Movie updated successfully', movie });
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // @route DELETE api/movies/id
  // @description Delete a movie
  // @access admin
  .delete(authMiddleware, adminMiddleware, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    try {
      if (movie === undefined) {
        res.status(404).json({
          error: `Cannot find movie with id: ${req.params.id}'`,
        });
        return;
      }
      res
        .status(200)
        .json({ message: 'Movie deleted successfully', movie });
    } catch (e) {
      res.sendStatus(400).send(e);
    }
  });

export default router;
