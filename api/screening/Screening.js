import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  // seat: {
  //   allSeats:[Objec...],
  //   emptySeats:[id,row,column],
  //   reservedSeat:[id/]
  //   purchasedSeat:[id]
  // }
});

export default mongoose.model('Screening', screeningSchema);
