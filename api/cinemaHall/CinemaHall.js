import mongoose from 'mongoose';

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
export default mongoose.model('CinemaHall', cinemaHallSchema);
