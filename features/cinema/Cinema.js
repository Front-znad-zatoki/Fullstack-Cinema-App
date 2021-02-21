const mongoose = require('mongoose');

// const CinemaHallSchema = new mongoose.Schema({
// numberOfHall: Number,
// numberOfSeats: Number,
// numberOfRows: Number,
// });
const CinemaSchema = new mongoose.Schema({
  country: String,
  city: String,
  street: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phone: Number,
  halls: [
    {
      type: Schema.ObjectId,
      ref: 'CinemaHallSchema',
    },
  ],
  // [CinemaHallSchema],
  hours: {
    open: {
      type: Number,
      min: 0,
      max: 23,
    },
    close: {
      type: Number,
      min: 0,
      max: 23,
    },
  },
});
module.exports = mongoose.model('cinema', CinemaSchema);
