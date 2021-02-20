const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  screeningId: String,
  userId: String,
  quantity: {
    type: Number,
    // required: true,
  },
  location: String,
  cinemaHall: String,
  seats: String,
  price: Number,
  screeningDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ticket', TicketSchema);
