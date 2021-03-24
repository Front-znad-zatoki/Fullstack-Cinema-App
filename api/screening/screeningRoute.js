import express from 'express';
import { check, validationResult } from 'express-validator';
import Screening from './Screening.js';
import Movie from '../movie/Movie.js';
import CinemaHall from '../cinemaHall/CinemaHall.js';
import Ticket from '../ticket/Ticket.js';
import Order from '../order/Order.js';
import User from '../user/User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';
import modifyDate from '../utils/modifyDate.js';
import sendEmail from '../../mail/sendEmail.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/screenings
  // @description Get all screenings
  // @access Public
  .get(async (req, res) => {
    try {
      const screenings = await Screening.find({});
      res.status(200).json(screenings);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route POST api/screenings
  // @description Create a screening
  // @access Admin
  .post(
    authMiddleware,
    adminMiddleware,
    check('movieId', 'Please enter movie id').trim().notEmpty(),
    check('cinemaHallId', 'Please enter cinema hall id')
      .trim()
      .notEmpty(),
    check('price.normal', 'Please enter price').notEmpty().isFloat(),
    check('price.reduced', 'Please enter price').notEmpty().isFloat(),
    check('startDate', 'Start date needs to be a valid date')
      .trim()
      .isISO8601()
      .toDate(),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // eslint-disable-next-line object-curly-newline
      const { movieId, cinemaHallId, price, startDate } = req.body;
      try {
        const movie = await Movie.findById(movieId);
        const cinemaHall = await CinemaHall.findById(cinemaHallId);
        if (movie === undefined) {
          return res.status(400).json({
            error: `Cannot find movie with id: ${req.params.id}'`,
          });
        }
        if (cinemaHall === undefined) {
          return res.status(400).json({
            error: `Cannot find cinemaHall with id: ${req.params.id}'`,
          });
        }
        const conflictingScreenings = await Screening.find({
          $or: [
            {
              startDate: {
                $gte: startDate,
                $lte: modifyDate(startDate, movie.duration + 10),
              },
              cinemaHall: cinemaHallId,
            },
            {
              endDate: {
                $gte: modifyDate(startDate, -10),
                $lte: modifyDate(startDate, movie.duration),
              },
              cinemaHall: cinemaHallId,
            },
          ],
        });

        if (conflictingScreenings.length > 0) {
          return res
            .status(400)
            .json({ error: 'Conflicting screenings found.' });
        }

        // TODO: Verify screening hours with cinema working hours

        const screening = new Screening({
          movie: movieId,
          cinemaHall: cinemaHallId,
          price,
          startDate,
          endDate: modifyDate(startDate, movie.duration),
        });
        await screening.save();
        return res.status(200).json({ message: screening.id });
      } catch (e) {
        return res.status(400).send(e);
      }
    },
  );

router
  .route('/:id')
  // @route GET api/screenings/id
  // @description Get a screening
  // @access User
  .get(authMiddleware, async (req, res) => {
    const screening = await Screening.findById(req.params.id);
    try {
      if (screening === undefined) {
        return res.status(404).json({
          error: `Cannot find screening with id: ${req.params.id}`,
        });
      }
      return res.status(200).json(screening);
    } catch (e) {
      return res.status(400).send(e);
    }
  })
  // @route PUT api/screenings/id
  // @description Update a screening
  // @access Admin
  .put(authMiddleware, adminMiddleware, async (req, res) => {
    const screening = await Screening.findById(req.params.id);
    try {
      if (screening === undefined) {
        return res.status(404).json({
          error: `Cannot find screening with id: ${req.params.id}'`,
        });
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
      return res.status(200).json({
        message: 'Screening updated successfully',
        screening,
      });
    } catch (e) {
      return res.status(400).send(e);
    }
  })
  // @route DELETE api/screenings/id
  // @description Delete a screening
  // @access Admin
  .delete(authMiddleware, adminMiddleware, async (req, res) => {
    const screening = await Screening.findByIdAndRemove(
      req.params.id,
    );
    try {
      if (screening === undefined) {
        return res.status(404).json({
          error: `Cannot find screening with id: ${req.params.id}'`,
        });
      }
      const tickets = await Ticket.find({
        id: { $in: screening.tickets },
      });
      const orders = await Order.find({
        id: { $in: tickets.map((ticket) => ticket.order) },
      });

      orders.forEach(async (order) => {
        const user = await User.findById(order.user);
        sendEmail(user.email, order.id, 'deleted');
      });

      return res.status(204).json(screening);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

export default router;
