import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const screeningSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  },
  cinemaHall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
  },
  price: Number,
  startDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Screening', screeningSchema);
