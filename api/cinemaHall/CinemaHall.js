const mongoose = require('mongoose');

const CinemaHallSchema = new mongoose.Schema({
  name: Number,
  seats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
    },
  ],
  rows: Number,
  columns: Number,
  cinema: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
  },
});
module.exports = mongoose.model('CinemaHall', CinemaHallSchema);
