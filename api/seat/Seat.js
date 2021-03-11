import mongoose from 'mongoose';

const { Schema } = mongoose;

const seatSchema = new Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
  },
});
export default mongoose.model('Seat', seatSchema);
