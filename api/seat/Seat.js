import mongoose from 'mongoose';

const { Schema } = mongoose;

const seatSchema = new Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
});

export default mongoose.model('Seat', seatSchema);
