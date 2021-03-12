import mongoose from 'mongoose';

const { Schema } = mongoose;
const validateEmail = function (email) {
  const re = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
  return re.test(email);
};

const cinemaSchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'invalid email'],
    match: [
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
      'Please fill a valid email address',
    ],
  },
  phone: { type: String, required: true },
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
export default mongoose.model('Cinema', cinemaSchema);
