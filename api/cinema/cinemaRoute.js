import express from 'express';
// Cinema model
import Cinema from './Cinema.js';
import authMiddleware from '../authentication/authMiddleware.js';

const router = express.Router();

// @roote GET api/cinemas
// @desc Get all cinemas
// @access Public
router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json(cinemas);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @roote GET api/cinemas
// @desc Create a Cinema
// @access Admin
router.post('/', authMiddleware, async (req, res) => {
  const { country, city, street, email, phone, hours } = req.body;

  try {
    const newCinema = new Cinema({
      country,
      city,
      street,
      email,
      phone,
      hours,
    });
    await newCinema.save();
    res.status(201).end();
  } catch (e) {
    res.status(400).send(e);
  }
});

// @roote GET api/cinemas/:id
// @desc Get a Cinema
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      res.status(404).json({
        error: `Cannot find cinema with id: ${req.params.id}`,
      });
    }
    res.status(200).json(cinema);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @roote GET api/cinemas/:id
// @desc Delete a Cinema
// @access Admin
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!cinema) {
      res.status(404).json({
        error: `Cannot find cinema with id: ${req.params.id}`,
      });
    }
    res.status(204).end();
  } catch (e) {
    res.status(500).send(e);
  }
});

// @roote PUT api/cinemas/:id
// @desc Change in a Cinema
// @access Admin
router.put('/:id', authMiddleware, async (req, res) => {
  const { country, city, street, email, phone, hours } = req.body;
  try {
    const newCinema = await Cinema.findById(req.params.id);
    if (!newCinema) {
      res.status(404).json({
        error: `Cannot find cinema with id: ${req.params.id}'`,
      });
      return;
    }
    if (country !== undefined) {
      newCinema.country = country;
    }
    if (city !== undefined) {
      newCinema.city = city;
    }
    if (street !== undefined) {
      newCinema.street = street;
    }
    if (email !== undefined) {
      newCinema.email = email;
    }
    if (phone !== undefined) {
      newCinema.phone = phone;
    }
    if (hours !== undefined) {
      newCinema.hours = hours;
    }
    await newCinema.save();
    res
      .status(200)
      .json({ message: 'Cinema updated successfully', newCinema });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
