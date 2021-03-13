import mongoose from 'mongoose';

const { Schema } = mongoose;
const validateEmail = function (email) {
  const re = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
  return re.test(email);
};

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  status: String,
  tickets: {
    type: Array,
    required: true,
  },

  // TODO: prepare enum for that field
  // TODO: add tickets array here?
});

export default mongoose.model('Order', orderSchema);
