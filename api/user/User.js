import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxlength: 255,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  reservations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'reservation',
  },
  phone: {
    type: String,
    minLength: 7,
    maxlength: 20,
  },
  // TODO: add avatar
  // avatar: {
  //   type: String,
  // },
});

// TODO: add validation (joi? unique validator?)

export default mongoose.model('User', userSchema);
