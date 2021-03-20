import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 50,
  },
  surname: {
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
  // orders: [
  //   {
  //     order: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'order',
  //     },
  //   },
  // ],
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

export default mongoose.model('User', userSchema);
