/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import Seat from '../seat/Seat.js';

const { Schema } = mongoose;

const cinemaHallSchema = new Schema({
  name: { type: Number, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  cinema: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Cinema',
  },
});

cinemaHallSchema.statics.generateSeats = async function generateSeats(
  cinemaHallId,
  rows,
  columns,
  cb,
) {
  try {
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const seat = new Seat({
          hall: cinemaHallId,
          row: i,
          column: j,
        });
        await seat.save();
      }
    }
  } catch (err) {
    return cb(err);
  }
};

export default mongoose.model('CinemaHall', cinemaHallSchema);
