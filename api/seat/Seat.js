import mongoose from 'mongoose';

const { Schema } = mongoose;

const seat = new Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
  },
});
export default mongoose.model('Seat', seatSchema);
