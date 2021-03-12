import express from 'express';
// CinemaHall model
import Seat from './Seat.js';
import authMiddleware from '../authentication/authMiddleware.js';

const router = express.Router();

// @roote GET api/seats
// @desc Get all seats
// @access Public

router.get('/', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @roote GET api/seats
// @desc Create a seat
// @access Admin
router.post('/', authMiddleware, async (req, res) => {
  const { hall } = req.body;
  try {
    const seat = new Seat({
      hall,
    });

    await seat.save();
    res.status(201).end();
  } catch (e) {
    res.status(400).send(e);
  }
});

// @roote GET api/seats/:id
// @desc Get a seat
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({
        error: `Cannot find seat with id: ${req.params.id}`,
      });
    }
    return res.status(200).json(seat);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @roote GET api/seats/:id
// @desc Delete a seat
// @access Admin
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) {
      return res.status(404).json({
        error: `Cannot find seat with id: ${req.params.id}`,
      });
    }
    return res.status(204).end();
  } catch (e) {
    res.status(500).send(e);
  }
});
// @roote PUT api/seats/:id
// @desc Change in a seat
// @access Admin
router.put('/:id', authMiddleware, async (req, res) => {
  const { hall } = req.body;
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      res.status(404).json({
        error: `Cannot find seat with id: ${req.params.id}'`,
      });
      return;
    }
    if (hall !== undefined) {
      seat.hall = hall;
    }

    await seat.save();
    res.status(200).json({
      message: 'Seat updated successfully',
      seat,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
