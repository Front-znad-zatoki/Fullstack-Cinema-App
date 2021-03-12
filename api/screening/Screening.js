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
  // row1: [ {name:1A, state: empty, id: ObjectId}, {name:1A, state: booked, id: ObjectId},  ]
  //   allSeats:[Objec...],
  //   emptySeats:[id,row,column],
  //   reservedSeat:[id/]
  //   purchasedSeat:[id]
  // }
});

export default mongoose.model('Screening', screeningSchema);
