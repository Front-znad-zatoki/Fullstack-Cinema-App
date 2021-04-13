import mongoose from 'mongoose';
import Ticket from '../ticket/Ticket.js';
import validateEmail from '../utils/validateEmail.js';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // validate: [validateEmail, 'invalid email'],
    },
    status: {
      type: String,
      enum: ['booked', 'paid', 'cancelled', 'pending'],
      required: true,
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
  },
  { timestamps: true },
);

orderSchema.methods.createOrdersDependencies = async function createOrdersDependencies(
  seats,
  screening,
  order,
  prices,
  cb,
) {
  try {
    const promises = seats.map((ticketToCreate, index) => {
      const newTicket = new Ticket({
        seat: ticketToCreate.id,
        order: order.id,
        screening: screening,
        price: prices[index],
      });
      return newTicket.save();
    });
    const promisesResolved = await Promise.all(promises);
    const arrayOfTicketIds = promisesResolved.map((prom) => prom.id);
    return arrayOfTicketIds;
  } catch (err) {
    return cb(err);
  }
};

orderSchema.post(
  'remove',
  { query: true, document: true },
  async (doc) => {
    try {
      await Ticket.deleteMany({ order: doc.id });
    } catch (err) {
      console.log(err);
    }
  },
);

export default mongoose.model('Order', orderSchema);
