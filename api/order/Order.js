import mongoose from 'mongoose';
import Screening from '../screening/Screening.js';
import Ticket from '../ticket/Ticket.js';
import validateEmail from '../utils/validateEmail.js';

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
});

orderSchema.methods.createOrdersDependencies = async function createOrdersDependencies(
  seats,
  screening,
  order,
  cb,
) {
  try {
    const promises = seats.map((ticketToCreate) => {
      const newTicket = new Ticket({
        seat: ticketToCreate.id,
        order: order.id,
        screening: screening,
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

orderSchema.post('save', (doc) => {
  console.log('post save', doc);
});

orderSchema.post(
  'remove',
  { query: true, document: true },
  async (doc) => {
    try {
      const [ticketsToRemove, screeningToUpdate] = doc.tickets.reduce(
        (acc, cur) => {
          acc[0].push(cur.id);
          if (!acc[1].includes(cur.screening)) {
            acc[1].push(cur.screening);
          }
          return acc;
        },
        [[], []],
      );
      await Ticket.deleteMany({
        _id: {
          $in: ticketsToRemove,
        },
      });

      await Screening.findByIdAndUpdate(screeningToUpdate[0], {
        $pull: {
          tickets: {
            $in: ticketsToRemove,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
);

export default mongoose.model('Order', orderSchema);
