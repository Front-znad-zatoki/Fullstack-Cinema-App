//cinemaHall endpoints
const express = require('express');
const router = express.Router();
const CinemaHall = require('./CinemaHall');

router.get('/', (req, res) => {
  Cinema.find().then((cinemaHalls) => res.json(cinemaHalls));
});
router.get('/:id', (req, res) => {
  CinemaHall.findById(req.params.id).then((cinemaHall) =>
    res.json(cinemaHall),
  );
});

router.post('/', (req, res) => {
  const newCinemaHall = new CinemaHall({ city: req.body.name });
  newCinemaHall.save().then((cinemaHall) => res.json(cinemaHall));
});
router.delete('/:id', (req, res) => {
  try {
    CinemaHall.findById(req.params.id).then((cinemaHall) =>
      cinemaHall.remove().then(() => res.json({ success: true })),
    );
  } catch (err) {
    res.status(404).json({ success: false });
  }
});
module.exports = router;
