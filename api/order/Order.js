import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  email: String,
  status: String,
});

export default mongoose.model('Order', orderSchema);
