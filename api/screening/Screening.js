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
  endDate: {
    type: Date,
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  ],
  // seat: {
  // row1: [ {name:1A, state: empty, id: ObjectId}, {name:1A, state: booked, id: ObjectId},  ]
  //   allSeats:[Objec...],
  //   emptySeats:[id,row,column],
  //   reservedSeat:[id/]
  //   purchasedSeat:[id]
  // }
});

export default mongoose.model('Screening', screeningSchema);
