import mongoose from 'mongoose';

const { Schema } = mongoose;

const seatSchema = new Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
  },
  // row:1
  // column;9
});
export default mongoose.model('Seat', seatSchema);
