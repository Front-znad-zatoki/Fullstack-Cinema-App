import express from 'express';
import Cinema from './Cinema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json(cinemas);
  } catch (e) {
    res.status(400).send(e);
  }
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
  try {
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
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/:id', async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);
  try {
    if (cinema === undefined) {
      return res.status(404).json({
        error: `Cannot find cinema with id: ${req.params.id}`,
      });
    }
    res.status(200).json(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  const cinema = await Cinema.findByIdAndDelete(req.params.id);
  try {
    if (cinema === undefined) {
      return res.status(404).json({
        error: `Cannot find cinema with id: ${req.params.id}`,
      });
    }
    return res.status(204).end();
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
