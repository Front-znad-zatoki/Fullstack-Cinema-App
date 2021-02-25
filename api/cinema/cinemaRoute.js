//cinema endpoints
const express = require('express');
const router = express.Router();
const Cinema = require('./Cinema');

router.get('/', async (req, res) => {
  const cinemas = await Cinema.find();
  return res.status(200).json(cinemas);
});

router.post('/', async (req, res) => {
  const {
    country,
    city,
    street,
    email,
    phone,
    halls,
    hours,
  } = req.body;
  const newCinema = new Cinema({
    country,
    city,
    street,
    email,
    phone,
    halls,
    hours,
  });
  await newCinema.save();
  res.status(201).end();
});

router.get('/:id', async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);
  if (cinema === undefined) {
    return res.status(404).json({
      error: `Cannot find cinema with id: ${req.params.id}`,
    });
  }
  return res.status(200).json(cinema);
});

router.delete('/:id', async (req, res) => {
  const cinema = await Cinema.deleteById(req.params.id);
  if (cinema === undefined) {
    return res.status(404).json({
      error: `Cannot find cinema with id: ${req.params.id}`,
    });
  }
  return res.status(204).end();
});

module.exports = router;
