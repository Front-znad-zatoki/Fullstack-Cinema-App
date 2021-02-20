const mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
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
  // TODO: add avatar
  // avatar: {
  //   type: String,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// TODO: add validation (joi?)

module.exports = mongoose.model('user', UserSchema);
