import mongoose from 'mongoose';

const { Schema } = mongoose;

const screeningSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  cinemaHall: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
    required: true,
  },
  price: {
    normal: { type: Number, required: true },
    reduced: { type: Number },
  },
  startDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Screening', screeningSchema);
