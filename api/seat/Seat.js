const mongoose = require('mongoose');

const Seat = new mongoose.Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
  },
});
module.exports = mongoose.model('Seat', SeatSchema);
