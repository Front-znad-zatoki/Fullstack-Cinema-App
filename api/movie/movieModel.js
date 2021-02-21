import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: String,
  duration: Number,
});

export default model('movie', movieSchema);
