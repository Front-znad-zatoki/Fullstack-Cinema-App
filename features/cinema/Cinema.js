const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
  country: {
    type: string,
    required: true,
  },
  city: {
    type: string,
    required: true,
  },
  street: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phone: {
    type: number,
    min: 9,
    required: true,
  },
  halls: {
    type: array,
  },
});
