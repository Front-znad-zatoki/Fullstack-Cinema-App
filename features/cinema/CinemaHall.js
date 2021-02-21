const mongoose = require('mongoose');

const CinemaHallSchema = new mongoose.Schema({
  numberOfHall: Number,
  numberOfSeats: Number,
  numberOfRows: Number,
});
module.exports = mongoose.model('cinemaHall', CinemaHallSchema);
