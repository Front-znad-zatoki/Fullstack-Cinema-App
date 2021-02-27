import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cinemaSchema = new mongoose.Schema({
  country: String,
  city: String,
  street: String,
  // email: {
  //   type: String,
  //   trim: true,
  //   lowercase: true,
  //   unique: true,
  //   required: 'Email address is required',
  //   validate: [validateEmail, 'Please fill a valid email address'],
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     'Please fill a valid email address',
  //   ],
  // },
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
