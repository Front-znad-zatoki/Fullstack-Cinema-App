import express from 'express';
// CinemaHall model
import CinemaHall from './CinemaHall.js';
import authMiddleware from '../authentication/authMiddleware.js';

const router = express.Router();

// @roote GET api/cinemaHalls
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

// @roote GET api/cinemaHalls
// @desc Create a cinema hall
// @access Admin
router.post('/', authMiddleware, async (req, res) => {
  const { name, seats, rows, columns, cinema } = req.body;
  try {
    const newCinemaHall = new CinemaHall({
      name,
      seats,
      rows,
      columns,
      cinema,
    });

    await newCinemaHall.save();
    res.status(201).end();
  } catch (e) {
    res.status(400).send(e);
  }
});

// @roote GET api/cinemahalls/:id
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

// @roote GET api/cinemaHalls/:id
// @desc Delete a cinema hall
// @access Admin
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cinemaHall = await CinemaHall.findByIdAndDelete(
      req.params.id,
    );
    if (!cinemaHall) {
      return res.status(404).json({
        error: `Cannot find cinema hall with id: ${req.params.id}`,
      });
    }
    return res.status(204).end();
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
