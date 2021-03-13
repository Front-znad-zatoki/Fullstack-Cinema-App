import mongoose from 'mongoose';
import validateEmail from '../utils/validateEmail.js';

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
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
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    required: true,
  },

  // TODO: prepare enum for that field
  // TODO: add tickets array here?
});

orderSchema.method.createOrdersDependencies = async function createOrdersDependencies(
  ticketsData,
  cb,
) {
  try {
    // TODO: add tickets create logic
    console.log(ticketsData);
    console.log(this);
  } catch (err) {
    return cb(err);
  }
};

orderSchema.post('save', (doc) => {
  console.log(doc);
  console.log('post save');
});

orderSchema.post('remove', { query: true, document: true }, (doc) => {
  console.log(doc.tickets);
  // TODO: add tickets delete logic
  console.log('post remove');
});

export default mongoose.model('Order', orderSchema);
