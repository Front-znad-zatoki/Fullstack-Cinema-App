import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
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

export default mongoose.model('Movie', movieSchema);
