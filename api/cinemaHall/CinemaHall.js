import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cinemaHallSchema = new Schema({
  name: Number,
  seats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
    },
  ],
  rows: Number,
  columns: Number,
  cinema: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
  },
});
export default mongoose.model('CinemaHall', cinemaHallSchema);
