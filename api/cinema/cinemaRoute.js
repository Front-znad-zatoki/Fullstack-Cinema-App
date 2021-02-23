//cinema endpoints
const express = require('express');
const router = express.Router();
const Cinema = require('./Cinema');

router.get('/cinemas', (req, res) => {
  Cinema.find().then((cinemas) => res.json(cinemas));
});
router.get('/cinemas/:id', (req, res) => {
  Cinema.findById(req.params.id).then((cinema) => res.json(cinema));
});

router.post('/cinemas', (req, res) => {
  const newCinema = new Cinema({ city: req.body.name });
  newCinema.save().then((cinema) => res.json(cinema));
});
router.delete('/cinemas/:id', (req, res) => {
  try {
    Cinema.findById(req.params.id).then((cinema) =>
      cinema.remove().then(() => res.json({ success: true })),
    );
  } catch (err) {
    res.status(404).json({ success: false });
  }
});
module.exports = router;
