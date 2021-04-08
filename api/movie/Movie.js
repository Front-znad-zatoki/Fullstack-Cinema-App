import mongoose from 'mongoose';
import Screening from '../screening/Screening.js';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    unique: true,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
});
movieSchema.post(
  'findOneAndDelete',
  { query: true, document: true },
  async (doc) => {
    try {
      await Screening.deleteMany({ movie: doc.id });
    } catch (err) {
      console.log(err);
    }
  },
);

export default mongoose.model('Movie', movieSchema);
