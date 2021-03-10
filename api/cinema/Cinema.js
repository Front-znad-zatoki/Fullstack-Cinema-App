import mongoose from 'mongoose';

const { Schema } = mongoose;
const validateEmail = function (email) {
  const re = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
  return re.test(email);
};

const cinemaSchema = new mongoose.Schema({
  country: String,
  city: String,
  street: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'invalid email'],
    match: [
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
      'Please fill a valid email address',
    ],
  },
  phone: String,
  halls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CinemaHall',
    },
  ],
  hours: {
    open: {
      type: Number,
      min: 0,
      max: 23,
    },
    close: {
      type: Number,
      min: 0,
      max: 23,
    },
  },
});
export default mongoose.model('Cinema', cinemaSchema);
