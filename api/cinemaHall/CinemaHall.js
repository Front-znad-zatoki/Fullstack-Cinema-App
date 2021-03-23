/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import Seat from '../seat/Seat.js';
import Screening from '../screening/Screening.js';

const { Schema } = mongoose;

const cinemaHallSchema = new Schema({
  name: { type: String, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  cinemaId: {
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
          hallId: cinemaHallId,
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
cinemaHallSchema.post(
  'findOneAndDelete',
  { query: true, document: true },
  async (doc) => {
    try {
      await Seat.deleteMany({ hallId: doc.id });
    } catch (err) {
      console.log(err);
    }
  },
);
cinemaHallSchema.post(
  'findOneAndDelete',
  { query: true, document: true },
  async (doc) => {
    try {
      await Screening.deleteMany({ cinemaHall: doc.id });
    } catch (err) {
      console.log(err);
    }
  },
);

export default mongoose.model('CinemaHall', cinemaHallSchema);
