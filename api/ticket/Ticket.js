import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  screening: {
    type: Schema.Types.ObjectId,
    ref: 'screening',
  },
  // user: // tak jak screening
  location: String,
  cinemaHall: String,
  seats: String,
  price: Number,
  screeningDate: {
    type: Date,
    default: Date.now,
  },
});

export default model('ticket', ticketSchema);
