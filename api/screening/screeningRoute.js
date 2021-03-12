import express from 'express';
import Screening from './Screening.js';
import Movie from '../movie/Movie.js';
import CinemaHall from '../cinemaHall/CinemaHall.js';
import authMiddleware from '../authentication/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const screenings = await Screening.find({});
      res.status(200).json(screenings);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .post(authMiddleware, async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { movieId, cinemaHallId, price, startDate } = req.body;
    try {
      const movie = await Movie.findById(movieId);
      const cinemaHall = await CinemaHall.findById(cinemaHallId);
      if (movie === undefined) {
        res.status(400).json({
          error: `Cannot find movie with id: ${req.params.id}'`,
        });
        return;
      }
      if (cinemaHall === undefined) {
        res.status(400).json({
          error: `Cannot find cinemaHall with id: ${req.params.id}'`,
        });
        return;
      }

      const screening = new Screening({
        movie: movieId,
        cinemaHall: cinemaHallId,
        price,
        startDate,
      });
      await screening.save();
      res.status(200).json({ message: screening.id });
    } catch (e) {
      res.status(400).send(e);
    }
  });

router
  .route('/:id')
  .get(authMiddleware, async (req, res) => {
    const screening = await Screening.findById(req.params.id);
    try {
      if (screening === undefined) {
        res.status(404).json({
          error: `Cannot find screening with id: ${req.params.id}`,
        });
        return;
      }
      res.status(200).json(screening);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .put(authMiddleware, async (req, res) => {
    const screening = await Screening.findById(req.params.id);
    try {
      if (screening === undefined) {
        res.status(404).json({
          error: `Cannot find screening with id: ${req.params.id}'`,
        });
        return;
      }
      if (req.body.movie !== undefined) {
        screening.movie = req.body.cinemaHall;
      }
      if (req.body.cinemaHall !== undefined) {
        screening.cinemaHall = req.body.cinemaHall;
      }
      if (req.body.price !== undefined) {
        screening.price = req.body.price;
      }
      if (req.body.startDate !== undefined) {
        screening.startDate = req.body.startDate;
      }
      await screening.save();
      res.status(200).json({
        message: 'Screening updated successfully',
        screening,
      });
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .delete(authMiddleware, async (req, res) => {
    const screening = await Screening.findByIdAndRemove(
      req.params.id,
    );
    try {
      if (screening === undefined) {
        res.status(404).json({
          error: `Cannot find screening with id: ${req.params.id}'`,
        });
        return;
      }
      res.status(204).json(screening);
    } catch (e) {
      res.status(400).send(e);
    }
  });

export default router;
