const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  orderId: String,
  userSeats: String,
  assignId: String,
});

module.exports = mongoose.model('book', bookSchema);
