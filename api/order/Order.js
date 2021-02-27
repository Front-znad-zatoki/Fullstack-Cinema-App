import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  email: String,
  status: String,
  // TODO: prepare enum for that field
  // TODO: add tickets array here?
});

export default mongoose.model('Order', orderSchema);
