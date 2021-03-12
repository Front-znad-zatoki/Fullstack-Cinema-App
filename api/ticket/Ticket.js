import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketSchema = new Schema({
  screening: {
    type: Schema.Types.ObjectId,
    ref: 'Screening',
  },
  row: Number,
  column: Number,
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

export default mongoose.model('Ticket', ticketSchema);
