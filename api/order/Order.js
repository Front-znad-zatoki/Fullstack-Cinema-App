import mongoose from 'mongoose';
import Screening from '../screening/Screening.js';
import Seat from '../seat/Seat.js';
import Ticket from '../ticket/Ticket.js';
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

orderSchema.statics.createOrdersDependencies = async function createOrdersDependencies(
  ticketsData,
  screening,
  orderId,
  cb,
) {
  try {
    const ticketsIds = [];
    ticketsData.forEach(async (ticketToCreate) => {
      const screeningToUpdate = await Screening.findById(
        screening,
      ).select('tickets');
      if (!screeningToUpdate) return cb();
      const seatToTake = await Seat.findOne({
        name: ticketToCreate.name,
      }).select('id');
      if (!seatToTake) return cb();
      const newTicket = new Ticket({
        seat: seatToTake.id,
        order: orderId,
        screening: screening,
      });
      newTicket.save();
      screeningToUpdate.tickets.push(newTicket.id);
      ticketsIds.push(newTicket.id);
    });
    return ticketsIds;
  } catch (err) {
    return cb(err);
  }
};

orderSchema.post('save', (doc) => {
  // console.log(doc);
  console.log('post save');
});

orderSchema.post('remove', { query: true, document: true }, (doc) => {
  console.log(doc.tickets);
  // TODO: add tickets delete logic
  console.log('post remove');
});

export default mongoose.model('Order', orderSchema);
