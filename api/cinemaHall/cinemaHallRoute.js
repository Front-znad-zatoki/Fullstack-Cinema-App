//cinemaHall endpoints
const express = require('express');
const router = express.Router();
const CinemaHall = require('./CinemaHall');

router.get('/', async (req, res) => {
  const cinemaHalls = await CinemaHall.find();
  return res.status(200).json(cinemaHalls);
});

router.post('/', async (req, res) => {
  const { name, seats, rows, column, cinema } = req.body;
  const newCinemaHall = new CinemaHall({
    name,
    seats,
    rows,
    column,
    cinema,
  });
  await newCinemaHall.save();
  res.status(201).end();
});

router.get('/:id', async (req, res) => {
  const cinemaHall = await CinemaHall.findById(req.params.id);
  if (cinemaHall === undefined) {
    return res.status(404).json({
      error: `Cannot find cinema hall with id: ${req.params.id}`,
    });
  }
  return res.status(200).json(cinemaHall);
});

router.delete('/:id', async (req, res) => {
  const cinemaHall = await CinemaHall.deleteById(req.params.id);
  if (cinemaHall === undefined) {
    return res.status(404).json({
      error: `Cannot find cinema hall with id: ${req.params.id}`,
    });
  }
  return res.status(204).end();
});

module.exports = router;
