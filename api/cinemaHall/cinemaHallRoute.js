import express from 'express';
import { check, validationResult } from 'express-validator';
// CinemaHall model
import CinemaHall from './CinemaHall.js';
import Cinema from '../cinema/Cinema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';

const router = express.Router();

// @route GET api/cinemaHalls
// @desc Get all cinema halls
// @access Public

router.get('/', async (req, res) => {
  try {
    const cinemaHalls = await CinemaHall.find();
    res.status(200).json(cinemaHalls);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @route POST api/cinemaHalls
// @desc Create a cinema hall
// @access Admin
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  check('name', 'Name is required').notEmpty().isString().trim(),
  check('rows', 'Number of rows is required').notEmpty().isInt(),
  check('columns', 'Number of columns is required')
    .notEmpty()
    .isInt(),
  check('cinemaId', 'CinemaId is required').notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, rows, columns, cinemaId } = req.body;
    try {
      const cinema = await Cinema.findById(cinemaId);
      if (!cinema) {
        res.status(404).json({
          msg: `Cannot find cinema with id: ${req.params.id}'`,
        });
      }
      const hall = await CinemaHall.findOne({ name, cinemaId });
      if (hall) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Cinema hall already exists' }] });
      }
      const newCinemaHall = new CinemaHall({
        name,
        rows,
        columns,
        cinemaId,
      });
      await newCinemaHall.save();

      CinemaHall.generateSeats(
        newCinemaHall.id,
        rows,
        columns,
        (err) => {
          if (err) {
            return res
              .status(400)
              .json({ msg: 'Can not generate seats' });
          }
        },
      );

      res
        .status(201)
        .json({
          msg: 'New cinema hall created',
          cinemaHall: newCinemaHall,
        })
        .end();
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

// @route GET api/cinemahalls/:id
// @desc Get a cinema hall
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const cinemaHall = await CinemaHall.findById(req.params.id);
    if (!cinemaHall) {
      return res.status(404).json({
        error: `Cannot find cinema hall with id: ${req.params.id}`,
      });
    }
    return res.status(200).json(cinemaHall);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @route DELETE api/cinemahalls/:id
// @desc Delete a cinema hall
// @access Admin
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const cinemaHall = await CinemaHall.findByIdAndDelete(
        req.params.id,
      );
      if (!cinemaHall) {
        return res.status(404).json({
          error: `Cannot find cinema hall with id: ${req.params.id}`,
        });
      }
      // TODO: delete all tickets for screening, orders, send emails

      /* CinemaHall.deleteSeats(req.params.id, (err) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: 'Can not delete seats' });
        }
      });
      CinemaHall.deleteScreenings(req.params.id, (err) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: 'Can not delete screenings' });
        }
      }); */

      return res
        .status(200)
        .json({ msg: 'Cinema hall deleted' })
        .end();
    } catch (e) {
      res.status(500).send(e);
    }
  },
);

// @route PUT api/cinemahalls/:id
// @desc Change in a CinemaHall
// @access Admin
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { name, rows, columns, cinema } = req.body;
    try {
      const newCinemaHall = await CinemaHall.findById(req.params.id);
      if (!newCinemaHall) {
        res.status(404).json({
          error: `Cannot find cinema hall with id: ${req.params.id}'`,
        });
        return;
      }
      if (name !== undefined) {
        newCinemaHall.name = name;
      }
      if (rows !== undefined) {
        newCinemaHall.rows = rows;
      }
      if (columns !== undefined) {
        newCinemaHall.columns = columns;
      }
      if (cinema !== undefined) {
        newCinemaHall.cinema = cinema;
      }
      await newCinemaHall.save();
      res.status(200).json({
        message: 'Cinema updated successfully',
        newCinemaHall,
      });
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

export default router;
