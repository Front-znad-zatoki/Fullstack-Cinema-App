const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  name: String,
  price: Number,
  startDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('screening', screeningSchema);
