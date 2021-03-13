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
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
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
