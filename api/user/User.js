const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  uniqueValidator = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 30,
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
    maxlength: 30,
  },
  // TODO: add avatar
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('myprivatekey'),
  );
  //get the private key from the config file -> environment variable
  return token;
};

// TODO: add validation (joi?)

module.exports = mongoose.model('user', UserSchema);
