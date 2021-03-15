/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import validateEmail from '../utils/validateEmail.js';
import CinemaHall from '../cinemaHall/CinemaHall.js';

const { Schema } = mongoose;

const cinemaSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true, unique: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'invalid email'],
    match: [
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
      'Please fill a valid email address',
    ],
  },
  phone: { type: String, required: true, unique: true },
  hours: {
    open: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    close: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
  },
});
cinemaSchema.statics.deleteCinemaHalls = async function deleteCinemaHalls(
  cinemaId,
  cb,
) {
  try {
    await CinemaHall.deleteMany({
      cinema: cinemaId,
    });
  } catch (err) {
    return cb(err);
  }
};

export default mongoose.model('Cinema', cinemaSchema);
