import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  duration: Number,
});

export default mongoose.model('Movie', movieSchema);
