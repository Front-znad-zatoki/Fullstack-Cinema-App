import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Please enter movie title'],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Please enter duration'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please enter movie release date'],
  },
  description: {
    type: String,
    required: [true, 'Please enter movie description'],
  },
  poster: {
    type: String,
    required: [true, 'Please enter movie poster'],
  },
  genre: {
    type: String,
    required: [true, 'Please enter movie genre'],
    trim: true,
  },
});

export default mongoose.model('Movie', movieSchema);
